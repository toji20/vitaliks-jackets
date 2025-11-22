'use client'

import { createJacketSchema, TcreateJacketShema } from "@/lib/schema"
import { Plus, Trash2, Upload, Palette, Ruler, Image, Info, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { v4 as uuidv4 } from 'uuid'
import { supabase } from "@/lib/supabase"
import { addJacket } from "@/app/api/actions/actions"
import { zodResolver } from "@hookform/resolvers/zod"

interface Props {
  className?: string
  categories: { id: number; name: string }[]
}

export const JacketForm: React.FC<Props> = ({ categories }) => {
  const [submitting, setSubmitting] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const router = useRouter()

  const formMethods = useForm<TcreateJacketShema>({
    resolver: zodResolver(createJacketSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
      price: 0,
      descr: '',
      material: '',
      waterproof: '',
      insulation: '',
      season: '',
      country: '',
      care: '',
      categoryId: 1,
      colors: [{ 
        name: '',
        imageUrl: '',
        imageUrlTwo: '',
        imageUrlThree: '',
        imageUrlFour: '',
      }],
      sizes: [{ name: '', price: 0 }],
    },
  })

  const { 
    handleSubmit, 
    reset, 
    control, 
    setValue,
    watch,
    formState: { errors, isDirty } 
  } = formMethods

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  })

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: "sizes",
  })

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null
    
    const fileName = `${Date.now()}_${uuidv4()}_${file.name}`
    
    try {
      setImageUploading(true)
      
      const { data, error: uploadError } = await supabase
        .storage
        .from('vitalik')
        .upload(fileName, file)
      
      if (uploadError) throw uploadError
      
      const { data: { publicUrl } } = supabase
        .storage
        .from('vitalik')
        .getPublicUrl(data.path)
      
      toast.success("Изображение успешно загружено")
      return publicUrl
      
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Ошибка при загрузке изображения")
      return null
    } finally {
      setImageUploading(false)
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof TcreateJacketShema) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error("Пожалуйста, выберите файл изображения")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Размер файла не должен превышать 5MB")
      return
    }

    const imageUrl = await uploadImage(file)
    if (imageUrl) {
      setValue(fieldName, imageUrl)
    }
  }

  const handleColorImageChange = async (e: React.ChangeEvent<HTMLInputElement>, colorIndex: number, fieldName: 'imageUrl' | 'imageUrlTwo' | 'imageUrlThree' | 'imageUrlFour') => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error("Пожалуйста, выберите файл изображения")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Размер файла не должен превышать 5MB")
      return
    }

    const imageUrl = await uploadImage(file)
    if (imageUrl) {
      setValue(`colors.${colorIndex}.${fieldName}`, imageUrl)
    }
  }

  const addColor = () => {
    appendColor({ 
      name: '',
      imageUrl: '',
      imageUrlTwo: '',
      imageUrlThree: '',
      imageUrlFour: '',
    })
  }

  const addSize = () => {
    appendSize({ name: '', price: 0 })
  }

const onSubmit = async (data: TcreateJacketShema) => {
    try {
      setSubmitting(true)
      
      if (!data.imageUrl) {
        toast.error("Пожалуйста, загрузите главное изображение")
        return
      }

      const result = await addJacket(data)
      console.log(data)
      if (result?.success) {
        toast.success('Куртка успешно создана', {
          icon: '✅',
        })
        reset()
        router.refresh()
      } else {
        toast.error('Не удалось создать куртку', {
          icon: '❌',
        })
      }
    } catch (err) {
      console.error(err)
      toast.error('Произошла ошибка при создании куртки', {
        icon: '❌',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const clearForm = () => {
    if (confirm('Вы уверены, что хотите очистить форму? Все несохраненные данные будут потеряны.')) {
      reset()
      toast.success('Форма очищена')
    }
  }

  const ColorImagePreview = ({ colorIndex }: { colorIndex: number }) => {
    const colorImages = watch(`colors.${colorIndex}`)
    const hasImages = colorImages.imageUrl || colorImages.imageUrlTwo || colorImages.imageUrlThree || colorImages.imageUrlFour
    
    if (!hasImages) return null

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Image size={16} />
          Предпросмотр изображений:
        </label>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            { url: colorImages.imageUrl, label: 'Основное' },
            { url: colorImages.imageUrlTwo, label: 'Изобр. 2' },
            { url: colorImages.imageUrlThree, label: 'Изобр. 3' },
            { url: colorImages.imageUrlFour, label: 'Изобр. 4' }
          ].map((image, idx) => 
            image.url && (
              <div key={idx} className="flex-shrink-0 text-center">
                <img 
                  src={image.url} 
                  alt={image.label}
                  className="w-20 h-20 object-cover rounded-lg border-2 border-gray-300"
                />
                <p className="text-xs text-gray-500 mt-1">{image.label}</p>
              </div>
            )
          )}
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'basic', label: 'Основное', icon: Info },
    { id: 'colors', label: 'Цвета', icon: Palette },
    { id: 'sizes', label: 'Размеры', icon: Ruler },
  ]

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название куртки *
                </label>
                <input

type="text"
                  {...formMethods.register('name')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Введите название куртки"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <Info size={14} />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Категория *
                </label>
                <select
                  {...formMethods.register('categoryId', { valueAsNumber: true })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Выберите категорию</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Базовая цена куртки
                </label>
                <input
                  type="number"
                  {...formMethods.register('price', { valueAsNumber: true })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="0"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Главное изображение куртки *
              </label>
              <div className="flex gap-3 items-start">
                <input
                  type="url"
                  {...formMethods.register('imageUrl')}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="URL главного изображения"
                />
                <label className="cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Upload size={20} />
                  Загрузить
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'imageUrl')}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.imageUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.imageUrl?.message}</p>
              )}
              {watch('imageUrl') && (
                <div className="mt-3">
                  <img 
                    src={watch('imageUrl')} 
                    alt="Предпросмотр" 
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

{[
                { field: 'material', label: 'Материал' },
                { field: 'waterproof', label: 'Водонепроницаемость' },
                { field: 'insulation', label: 'Утеплитель' },
                { field: 'season', label: 'Сезон' },
                { field: 'country', label: 'Страна' },
                { field: 'care', label: 'Уход' }
              ].map(({ field, label }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  <input
                    type="text"
                    {...formMethods.register(field as any)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder={`Введите ${label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                {...formMethods.register('descr')}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Описание куртки..."
              />
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Palette size={20} />
                  Вариации цветов
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Добавьте цвета куртки с несколькими изображениями для каждого цвета
                </p>
              </div>
              <button
                type="button"
                onClick={addColor}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} />
                Добавить цвет
              </button>
            </div>

            <div className="space-y-6">
              {colorFields.map((field, index) => (
                <div key={field.id} className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-800 flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      Цвет #{index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="flex items-center gap-2 px-3 py-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                      Удалить
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Название цвета *
                    </label>
                    <input
                      type="text"
                      {...formMethods.register(`colors.${index}.name`)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"

placeholder="Например: Черный, Синий, Красный"
                    />
                    {errors.colors?.[index]?.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.colors[index]?.name?.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {([
                      { field: 'imageUrl', label: 'Основное изображение *', required: true },
                      { field: 'imageUrlTwo', label: 'Дополнительное изображение 2', required: false },
                      { field: 'imageUrlThree', label: 'Дополнительное изображение 3', required: false },
                      { field: 'imageUrlFour', label: 'Дополнительное изображение 4', required: false }
                    ] as const).map(({ field, label, required }) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {label}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            {...formMethods.register(`colors.${index}.${field}`)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder={`URL ${label.toLowerCase()}`}
                          />
                          <label className="cursor-pointer p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0">
                            <Upload size={16} />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleColorImageChange(e, index, field)}
                              className="hidden"
                            />
                          </label>
                        </div>
                        {required && errors.colors?.[index]?.[field] && (
                          <p className="mt-1 text-sm text-red-600">{errors.colors[index]?.[field]?.message}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <ColorImagePreview colorIndex={index} />
                </div>
              ))}
            </div>
            {errors.colors && (
              <p className="mt-2 text-sm text-red-600">{errors.colors.message}</p>
            )}
          </div>
        )}

        {activeTab === 'sizes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Ruler size={20} />
                  Размеры
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Добавьте доступные размеры и дополнительные цены
                </p>
              </div>
              <button
                type="button"
                onClick={addSize}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} />
                Добавить размер
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sizeFields.map((field, index) => (
                <div key={field.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                  <div className="flex gap-3 items-end">

<div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Размер
                      </label>
                      <input
                        type="text"
                        {...formMethods.register(`sizes.${index}.name`)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Например: M, L, XL"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Доп. цена
                      </label>
                      <input
                        type="number"
                        {...formMethods.register(`sizes.${index}.price`, { valueAsNumber: true })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="0"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 mb-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {errors.sizes && (
              <p className="mt-2 text-sm text-red-600">{errors.sizes.message}</p>
            )}
          </div>
        )}

        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={submitting || imageUploading || !isDirty}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Создание...
              </>
            ) : (
              <>
                <CheckCircle size={18} />
                Создать куртку
              </>
            )}
          </button>
          <button
            type="button"
            onClick={clearForm}
            disabled={submitting || !isDirty}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 font-medium"
          >
            Очистить форму
          </button>
        </div>
      </form>
    </FormProvider>
  )
}