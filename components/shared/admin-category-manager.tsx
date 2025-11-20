'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { TextEditor } from "./admin-text-editor"
import { JacketForm } from "./jacket-add"
import { IJacketWithRelations, JacketList, JacketWithRelations } from "./jacket-list"
import { Category, Jacket, Order } from "@prisma/client"
import { AdminOrdersPanel } from "./orders-panel"
import { CategorySchema, TCategorySchema } from "@/lib/schema"
import { addCategory, deleteCategory } from "@/app/api/actions/actions"

interface Props {
  categories: Category[]
}

export const CategoryManager: React.FC<Props> = ({ categories }) => {
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TCategorySchema>({
    resolver: zodResolver(CategorySchema)
  })

  const onSubmit = async (data: TCategorySchema) => {
    try {
      setSubmitting(true)
      
      const result = await addCategory(data)
      
      if (result?.success) {
        toast.success('Категория успешно добавлена', {
          icon: '✅',
        })
        reset()
        router.refresh()
      } else {
        toast.error('Не удалось добавить категорию', {
          icon: '❌',
        })
      }
    } catch (err) {
      console.error(err)
      toast.error('Произошла ошибка при добавлении категории', {
        icon: '❌',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту категорию?')) return
    
    try {
      setDeletingId(id)
      const result = await deleteCategory(id)
      
      if (result?.success) {
        toast.success('Категория успешно удалена', {
          icon: '✅',
        })
        router.refresh()
      } else {
        toast.error('Не удалось удалить категорию', {
          icon: '❌',
        })
      }
    } catch (err) {
      console.error(err)
      toast.error('Произошла ошибка при удалении категории', {
        icon: '❌',
      })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold mb-6 text-gray-900">Добавить новую категорию</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название категории *
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Введите название категории"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {submitting ? 'Добавление...' : 'Добавить категорию'}
            </button>

<button
              type="button"
              onClick={() => reset()}
              disabled={submitting}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 font-medium"
            >
              Очистить
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold mb-6 text-gray-900">Управление категориями</h3>
        
        {categories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Категорий пока нет</p>
            <p className="text-sm mt-2">Добавьте первую категорию используя форму выше</p>
          </div>
        ) : (
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold">{cat.id}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900">{cat.name}</h4>
                    <p className="text-sm text-gray-500">
                      Создана: {new Date(cat.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(cat.id)}
                  disabled={deletingId === cat.id}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-4"
                  title="Удалить категорию"
                >
                  {deletingId === cat.id ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Всего категорий: <strong>{categories.length}</strong>
          </span>
        </div>
      </div>
    </div>
  )
}
