'use client'

import { 
  deleteColor, 
  deleteJacket, 
  deleteSize, 
  toggleColordisdisabled, 
  toggleSizedisdisabled,
  toggleJacketdisdisabled,
  changePrice // добавляем импорт
} from "@/app/api/actions/actions"
import { Color, Jacket, Size } from "@prisma/client"
import { Edit3, Trash2, Eye, EyeOff, Palette, Ruler, Power, DollarSign } from "lucide-react"
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
  const [editingPrice, setEditingPrice] = useState<number | null>(null)
  const [newPriceValue, setNewPriceValue] = useState<string>('')
  const [isUpdatingPrice, setIsUpdatingPrice] = useState(false)
  const router = useRouter()

  const handlePriceUpdate = async (jacketId: number, currentPrice: number) => {
    if (!newPriceValue || isUpdatingPrice) return
    
    const newPrice = parseInt(newPriceValue)
    if (isNaN(newPrice) || newPrice === currentPrice) {
      setEditingPrice(null)
      setNewPriceValue('')
      return
    }

    setIsUpdatingPrice(true)
    const result = await changePrice(jacketId, newPrice)
    
    if (result.success) {
      toast.success('Цена успешно обновлена')
      router.refresh()
    } else {
      toast.error(result.error || 'Ошибка при обновлении цены')
    }
    
    setIsUpdatingPrice(false)
    setEditingPrice(null)
    setNewPriceValue('')
  }

  const startPriceEdit = (jacketId: number, currentPrice: number) => {
    setEditingPrice(jacketId)
    setNewPriceValue(currentPrice.toString())
  }

  const cancelPriceEdit = () => {
    setEditingPrice(null)
    setNewPriceValue('')
  }

  const handleToggleJacket = async (jacketId: number, disabled: boolean) => {
    const result = await toggleJacketdisdisabled(jacketId, !disabled)
    
    if (result.success) {
      toast.success(`Куртка ${!disabled ? 'включена' : 'отключена'}`)
      router.refresh()
    } else {
      toast.error('Ошибка при обновлении куртки')
    }
  }

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
      router.refresh()
    } else {
      toast.error('Ошибка при обновлении цвета')
    }
  }

  const handleDeleteColor = async (colorId: number) => {
    if (!confirm('Удалить этот цвет?')) return
    
    const result = await deleteColor(colorId)
    if (result.success) {
      toast.success('Цвет удален')
      router.refresh()
    } else {
      toast.error('Ошибка при удалении цвета')
    }
  }

const handleToggleSize = async (sizeId: number, disabled: boolean) => {
    const result = await toggleSizedisdisabled(sizeId, !disabled)
    if (result.success) {
      toast.success(`Размер ${!disabled ? 'включен' : 'отключен'}`)
      router.refresh()
    } else {
      toast.error('Ошибка при обновлении размера')
    }
  }

  const handleDeleteSize = async (sizeId: number) => {
    if (!confirm('Удалить этот размер?')) return
    
    const result = await deleteSize(sizeId)
    if (result.success) {
      toast.success('Размер удален')
      router.refresh()
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
        <div 
          key={jacket.id} 
          className={`border border-gray-200 rounded-lg shadow-sm transition-all ${
            jacket.disabled 
              ? 'bg-gray-50 opacity-70' 
              : 'bg-white'
          }`}
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="relative">
                  <img 
                    src={jacket.imageUrl}
                    alt={jacket.name}
                    className={`w-20 h-20 object-cover rounded-lg border transition-all ${
                      jacket.disabled ? 'grayscale' : ''
                    }`}
                  />
                  {jacket.disabled && (
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                      <EyeOff size={20} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={`text-lg font-semibold truncate ${
                      jacket.disabled ? 'text-gray-500' : 'text-gray-900'
                    }`}>
                      {jacket.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      jacket.disabled 
                        ? 'bg-gray-200 text-gray-600' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {jacket.disabled ? 'Отключена' : 'Активна'}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${
                    jacket.disabled ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {jacket.descr}
                  </p>
                  <div className={`flex items-center gap-4 mt-2 text-sm ${
                    jacket.disabled ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span>Цена:</span>
                      {editingPrice === jacket.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={newPriceValue}
                            onChange={(e) => setNewPriceValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handlePriceUpdate(jacket.id, Number(jacket.price))
                              } else if (e.key === 'Escape') {
                                cancelPriceEdit()
                              }
                            }}
                            className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                            disabled={isUpdatingPrice}
                          />
                          <button
                            onClick={() => handlePriceUpdate(jacket.id, Number(jacket.price))}
                            disabled={isUpdatingPrice}
                            className="p-1 text-green-600 hover:text-green-800 disabled:opacity-50"
                            title="Сохранить"
                          >
                            ✓
                          </button>
                          <button
                            onClick={cancelPriceEdit}
                            disabled={isUpdatingPrice}
                            className="p-1 text-red-600 hover:text-red-800 disabled:opacity-50"
                            title="Отмена"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{jacket.price} ₽</span>
                          <button
                            onClick={() => startPriceEdit(jacket.id, Number(jacket.price))}
                            disabled={Boolean(jacket.disabled) || isUpdatingPrice}
                            className={`p-1 rounded transition-colors ${
                              jacket.disabled 
                                ? 'text-gray-400 cursor-not-allowed' 
                                : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                            }`}
                            title="Изменить цену"
                          >
                            <DollarSign size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                    <span>Материал: {jacket.material}</span>
                    <span>Сезон: {jacket.season}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleToggleJacket(jacket.id, Boolean(jacket.disabled))}
                  className={`p-2 rounded transition-colors ${
                    jacket.disabled 
                      ? 'text-green-600 hover:text-green-800 hover:bg-green-50' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                  title={jacket.disabled ? 'Включить куртку' : 'Отключить куртку'}
                >
                  <Power size={16} />
                </button>

                <button
                  onClick={() => toggleExpand(jacket.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {expandedJacket === jacket.id ? '▲' : '▼'}
                </button>
                
                <button 
                  className={`p-2 transition-colors ${
                    jacket.disabled 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                  disabled={Boolean(jacket.disabled)}
                  title={jacket.disabled ? 'Нельзя редактировать отключенную куртку' : 'Редактировать'}
                >
                  <Edit3 size={16} />
                </button>
                
                <button 
                  className="p-2 text-red-600 hover:text-red-800 transition-colors" 
                  onClick={() => handleDelete(jacket.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>

          {expandedJacket === jacket.id && (
            <div className="border-t border-gray-200 p-6 bg-gray-50/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                            onClick={() => handleToggleColor(color.id, Boolean(color.disabled))}
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

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      jacket.disabled ? 'bg-gray-400' : 'bg-green-500'
                    }`}></div>
                    <span>Статус: {jacket.disabled ? 'Отключена' : 'Активна'}</span>
                  </div>
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