'use server'

import { CheckoutFormValues } from "@/components/shared/form-components/checkout-form-schema";
import { createPayment } from "@/lib/create-payment";
import { createJacketSchema, TCategorySchema, TcreateJacketShema } from "@/lib/schema";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies();
        const cartToken = (await cookieStore).get('cartToken')?.value;
    
        if (!cartToken) {
            throw new Error('Cart token not found');
        }
        // Находим корзину по токену
        const userCart = await prisma.cart.findFirst({
            include: {
              user: true,
              items: {
                include: {
                  sizes: true,
                  colors: true,
                  jacketItem: {
                    include: {
                      jacket: true,
                    },
                  },
                },
              },
            },
            where: {
              token: cartToken,
            },
          });
        if (!userCart) {
            throw new Error('Cart not found');
        }
        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty');
        }
        // создаем заказ
        const order = await prisma.order.create({
            data: {
              token: cartToken,
              phone: data.phone,
              address: data.address,
              totalAmount: userCart.totalAmount,
              status: OrderStatus.PENDING,
              items: JSON.stringify(userCart.items),
            },
          });
          await prisma.cart.update({
            where: {
              id: userCart.id,
            },
            data: {
              totalAmount: 0,
            },
          })

          await prisma.cartItem.deleteMany({
            where: {
              cartId: userCart.id,
            },
          });

          const paymentData = await createPayment({ 
            amount: order.totalAmount,  
            orderId: order.id,
            description: `Sneakers / Оплата заказа #${order.id}`, 
          });

          if (!paymentData) {
            throw new Error('Payment data not found');
          }

          await prisma.order.update({
            where: {
              id: order.id,
            },
            data: {
              paymentId: paymentData.id,
            },
          });

          const paymentUrl = paymentData.confirmation.confirmation_url;

          return paymentUrl
    } catch (err) {
      console.log('[CreateOrder] Server error', err);
    }
}


export async function addJacket(data: TcreateJacketShema) {
  const validatedData = createJacketSchema.parse(data);

  try {
    const jacket = await prisma.jacket.create({
      data: {
        name: validatedData.name,
        imageUrl: validatedData.imageUrl || '',
        price: validatedData.price,
        descr: validatedData.descr,
        material: validatedData.material,
        waterproof: validatedData.waterproof,
        insulation: validatedData.insulation,
        season: validatedData.season,
        country: validatedData.country,
        care: validatedData.care,
        categoryId: validatedData.categoryId,
        // Создаем связанные цвета
        colors: {
          create: validatedData.colors.map(color => ({
            name: color.name,
            imageUrl: color.imageUrl,
            imageUrlTwo: color.imageUrlTwo,
            imageUrlThree: color.imageUrlThree,
            imageUrlFour: color.imageUrlFour,
          }))
        },
        // Создаем связанные размеры
        sizes: {
          create: validatedData.sizes.map(size => ({
            name: size.name,
            imageUrl: size.imageUrl,
          }))
        },
      },
      include: {
        colors: true,
        sizes: true,
        category: true,
      }
    });

    const jacketItem = await prisma.jacketItem.create({
      data: {
        price: Number(data.price),
        jacketId: jacket.id,
        categoryId: data.categoryId
      }
    });
    return { 
      success: true, 
      message: 'Куртка успешно создана', 
      jacket,
      jacketItem
    };
  } catch (error) {
    console.error('Error creating jacket:', error);
    return { 
      success: false, 
      message: 'Ошибка при создании куртки' 
    };
  }
}

export async function deleteJacket(id: number) {
  try {

    await prisma.cartItem.deleteMany({
      where: {
        jacketItem: {
          jacketId: id
        }
      }
    });
    // Сначала удаляем связанные записи
    await prisma.color.deleteMany({
      where: { jacketId: id }
    });

    await prisma.size.deleteMany({
      where: { jacketId: id }
    });

    await prisma.jacketItem.deleteMany({
      where: { jacketId: id }
    });

    // Затем удаляем саму куртку
    await prisma.jacket.deleteMany({
      where: { id }
    });
    
    return { 
      success: true, 
      message: 'Куртка успешно удалена' 
    };
  } catch (error) {
    console.error('Error deleting jacket:', error);
    return { 
      success: false, 
      message: 'Ошибка при удалении куртки' 
    };
  }
}

export async function toggleSizedisdisabled(sizeId: number,disabled: boolean) {
  try {
    const size = await prisma.size.update({
      where: { id: sizeId },
      data: {disabled }
    })
    
    return { success: true, size }
  } catch (error) {
    console.error('Error toggling size:', error)
    return { success: false, error: 'Failed to update size' }
  }
}

export async function deleteSize(sizeId: number) {
  try {
    await prisma.size.delete({
      where: { id: sizeId }
    })
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting size:', error)
    return { success: false, error: 'Failed to delete size' }
  }
}

export async function toggleColordisdisabled(colorId: number,disabled: boolean) {
  try {
    const color = await prisma.color.update({
      where: { id: colorId },
      data: {disabled }
    })
    
    return { success: true, color }
  } catch (error) {
    console.error('Error toggling color:', error)
    return { success: false, error: 'Failed to update color' }
  }
}

export async function deleteColor(colorId: number) {
  try {
    await prisma.color.delete({
      where: { id: colorId }
    })
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting color:', error)
    return { success: false, error: 'Failed to delete color' }
  }
}

export async function deleteOrder(id:number) {
  try {
    await prisma.order.delete({
      where: {
        id: id
      }
    })
    return { success: true }
  } catch (err) {
    console.error('Error deleting order:', err)
    return { success: false, error: 'Failed to delete order' }
  }
}
 export async function changeStatusOrder(id: number,status: 'PENDING' | 'CANCELLED' | 'SUCCEEDED') {
  try {
    await prisma.order.update({
      where: {
        id: id
      },
      data: {
        status: status
      }
    })
    return { success: true }
  } catch (err) {
    console.error(':', err)
    return { success: false, error: '' }
  }
 }

 export async function addCategory(data: TCategorySchema) {
  try {
      const category = await prisma.category.create({
          data: {
              name: data.name
          }
      })
      return {
          success:true,
          data: {category}
      }
  } catch (err) {
      console.log(err)
  }
}

export async function deleteCategory(id: number) {
  try {
    const jackets = await prisma.jacket.findMany({
      where: { categoryId: id },
      select: { id: true }
    })

    const jacketIds = jackets.map(jacket => jacket.id)

    await prisma.cartItem.deleteMany({
      where: {
        jacketItem: {
          jacket: {
            categoryId: id
          }
        }
      }
    })

    await prisma.jacketItem.deleteMany({
      where: { 
        OR: [
          { categoryId: id },
          { jacketId: { in: jacketIds } }
        ]
      }
    })

    await prisma.color.deleteMany({
      where: {
        jacketId: { in: jacketIds }
      }
    })

    await prisma.size.deleteMany({
      where: {
        jacketId: { in: jacketIds }
      }
    })

    await prisma.jacket.deleteMany({
      where: { categoryId: id }
    })

    await prisma.category.delete({
      where: { id: id }
    })
    
    return { success: true }
  } catch (err) {
    console.error('Error deleting category:', err)
    return { 
      success: false, 
      error: 'Не удалось удалить категорию' 
    }
  }
}