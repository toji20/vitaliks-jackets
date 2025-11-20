// components/shared/jacket-list.tsx
'use client'

import { deleteColor, deleteJacket, deleteSize, toggleColordisdisabled, toggleSizedisdisabled } from "@/app/api/actions/actions"
import { Color, Jacket, Size } from "@prisma/client"
import { Edit3, Trash2, Eye, EyeOff, Palette, Ruler } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
export interface IJacketWithRelations extends Jacket {
  colors: Color[]
  sizes: Size[]
}
export interface JacketWithRelations extends Jacket {
  colors: {
    id: number
    imageUrl: string | null
    imageUrlTwo: string | null
    imageUrlThree: string | null
    imageUrlFour: string | null
    disabled: boolean | null
  }[]
  sizes: {
    id: number
    name: string | null
    price: number | null
    disabled: boolean | null
  }[]
}

interface Props {
  jackets: JacketWithRelations[]
}

export const JacketList: React.FC<Props> = ({ jackets }) => {
  const [expandedJacket, setExpandedJacket] = useState<number | null>(null)
  const router = useRouter()

    const handleDelete = async (jacketId: number) => {
        const confirmation = confirm('Вы уверены, что хотите удалить эту куртку?')
        if (!confirmation) return

        const result = await deleteJacket(jacketId)
        
        if (result.success) {
          toast.success('Куртка успешно удалена')
          router.refresh()
        } else {
          toast.error('Ошибка при удалении куртки')
        }
      }
  const handleToggleColor = async (colorId: number, disabled: boolean) => {
    const result = await toggleColordisdisabled(colorId, !disabled)
    if (result.success) {
      toast.success(`Цвет ${!disabled ? 'включен' : 'отключен'}`)
      // В реальном приложении нужно обновить данные
      window.location.reload()
    } else {
      toast.error('Ошибка при обновлении цвета')
    }
  }

  const handleDeleteColor = async (colorId: number) => {
    if (!confirm('Удалить этот цвет?')) return
    
    const result = await deleteColor(colorId)
    if (result.success) {
      toast.success('Цвет удален')
      window.location.reload()
    } else {
      toast.error('Ошибка при удалении цвета')
    }
  }

  const handleToggleSize = async (sizeId: number, disabled: boolean) => {
    const result = await toggleSizedisdisabled(sizeId, !disabled)
    if (result.success) {
      toast.success(`Размер ${!disabled ? 'включен' : 'отключен'}`)
      window.location.reload()
    } else {
      toast.error('Ошибка при обновлении размера')
    }
  }

  const handleDeleteSize = async (sizeId: number) => {
    if (!confirm('Удалить этот размер?')) return
    
    const result = await deleteSize(sizeId)
    if (result.success) {
      toast.success('Размер удален')
      window.location.reload()
    } else {
      toast.error('Ошибка при удалении размера')
    }
  }

  const toggleExpand = (jacketId: number) => {
    setExpandedJacket(expandedJacket === jacketId ? null : jacketId)
  }

  return (
    <div className="space-y-4">
      {jackets.map((jacket) => (
        <div key={jacket.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Основная информация о куртке */}
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <img 
                  src={jacket.imageUrl} 
                  alt={jacket.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {jacket.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{jacket.descr}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>Цена: {jacket.price} ₽</span>
                    <span>Материал: {jacket.material}</span>
                    <span>Сезон: {jacket.season}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => toggleExpand(jacket.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {expandedJacket === jacket.id ? '▲' : '▼'}
                </button>
                <button className="p-2 text-blue-600 hover:text-blue-800 transition-colors">
                  <Edit3 size={16} />
                </button>
                <button className="p-2 text-red-600 hover:text-red-800 transition-colors" onClick={() => handleDelete(jacket.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Раскрывающаяся секция с цветами и размерами */}
          {expandedJacket === jacket.id && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Цвета */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Palette size={18} className="text-purple-600" />
                    <h4 className="font-semibold text-gray-900">Цвета</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      jacket.colors.filter(c => c.disabled).length > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {jacket.colors.filter(c => c.disabled).length} активных
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {jacket.colors.map((color) => (
                      <div 
                        key={color.id} 
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                          color.disabled 
                            ? 'bg-white border-gray-200' 
                            : 'bg-gray-100 border-gray-300 opacity-60'
                        }`}
                      >
                        <div className="flex gap-2">
                          {[color.imageUrl, color.imageUrlTwo, color.imageUrlThree, color.imageUrlFour]
                            .filter(Boolean)
                            .map((url, idx) => (
                              <img 
                                key={idx}
                                src={url!} 
                                alt={`Color ${idx + 1}`}
                                className="w-10 h-10 object-cover rounded border"
                              />
                            ))
                          }
                        </div>
                        
                        <div className="flex-1"></div>
                        
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleToggleColor(color.id,Boolean(color.disabled))}
                            className={`p-1 rounded transition-colors ${
                              color.disabled 
                                ? 'text-green-600 hover:text-green-800' 
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                            title={color.disabled ? 'Отключить цвет' : 'Включить цвет'}
                          >
                            {color.disabled ? <Eye size={14} /> : <EyeOff size={14} />}
                          </button>
                          
                          <button
                            onClick={() => handleDeleteColor(color.id)}
                            className="p-1 text-red-600 hover:text-red-800 transition-colors"
                            title="Удалить цвет"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {jacket.colors.length === 0 && (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        Нет добавленных цветов
                      </div>
                    )}
                  </div>
                </div>

                {/* Размеры */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Ruler size={18} className="text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Размеры</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      jacket.sizes.filter(s => s.disabled).length > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {jacket.sizes.filter(s => s.disabled).length} активных
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {jacket.sizes.map((size) => (
                      <div 
                        key={size.id} 
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                          size.disabled 
                            ? 'bg-white border-gray-200' 
                            : 'bg-gray-100 border-gray-300 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-medium ${
                            size.disabled ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {size.name}
                          </span>
                          <span className={`text-sm ${
                            size.disabled ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            +{size.price} ₽
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleToggleSize(size.id, Boolean(size.disabled))}
                            className={`p-1 rounded transition-colors ${
                              size.disabled 
                                ? 'text-green-600 hover:text-green-800' 
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                            title={size.disabled ? 'Отключить размер' : 'Включить размер'}
                          >
                            {size.disabled ? <Eye size={14} /> : <EyeOff size={14} />}
                          </button>
                          
                          <button
                            onClick={() => handleDeleteSize(size.id)}
                            className="p-1 text-red-600 hover:text-red-800 transition-colors"
                            title="Удалить размер"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {jacket.sizes.length === 0 && (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        Нет добавленных размеров
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Статистика */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Активных цветов: {jacket.colors.filter(c => c.disabled).length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Отключенных цветов: {jacket.colors.filter(c => !c.disabled).length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Активных размеров: {jacket.sizes.filter(s => s.disabled).length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Отключенных размеров: {jacket.sizes.filter(s => !s.disabled).length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {jackets.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <div className="text-gray-400 mb-2">📦</div>
          <p className="text-gray-500 text-lg mb-2">Товары не найдены</p>
          <p className="text-gray-400 text-sm">Добавьте первый товар в каталог</p>
        </div>
      )}
    </div>
  )
}



