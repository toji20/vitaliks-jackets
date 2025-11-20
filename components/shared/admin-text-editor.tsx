'use client'

import { TextContent } from "@prisma/client";
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Search, Filter, Edit3, Trash2, Save, X, Download, Upload, Plus } from "lucide-react"

interface Props {
  className?: string;
}

export const TextEditor: React.FC<React.PropsWithChildren<Props>> = ({ }) => {
  const [texts, setTexts] = useState<TextContent[]>([])
  const [filteredTexts, setFilteredTexts] = useState<TextContent[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const loadTexts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/texts')
      const data = await response.json()
      setTexts(data)
      setFilteredTexts(data)
    } catch (error) {
      console.error('Ошибка загрузки текстов:', error)
      toast.error('Ошибка загрузки текстов')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTexts()
  }, [])

  useEffect(() => {
    let filtered = texts

    if (searchTerm) {
      filtered = filtered.filter(text => 
        text.key.toLowerCase().includes(searchTerm.toLowerCase()) || 
        text.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(text => text.category === selectedCategory)
    }

    setFilteredTexts(filtered)
  }, [searchTerm, selectedCategory, texts])

  const updateText = async (id: string) => {
    if (!editContent.trim()) {
      toast.error('Текст не может быть пустым')
      return
    }

    try {
      await fetch(`/api/texts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent })
      })

      setEditingId(null)
      setEditContent('')
      loadTexts()
      toast.success('Текст успешно обновлен')
    } catch (error) {
      console.error('Ошибка обновления текста:', error)
      toast.error('Ошибка при обновлении текста')
    }
  }

  const deleteText = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот текст?')) return
    
    try {
      await fetch(`/api/texts/${id}`, { method: 'DELETE' })
      loadTexts()
      toast.success('Текст успешно удален')
    } catch (error) {
      console.error('Ошибка удаления текста:', error)
      toast.error('Ошибка при удалении текста')
    }
  }

  const startEdit = (text: TextContent) => {
    setEditingId(text.id)
    setEditContent(text.content)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditContent('')
  }

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const exportTexts = () => {
    const dataStr = JSON.stringify(texts, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'texts-backup.json'
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Тексты экспортированы')
  }

  const categories = [...new Set(texts.map(text => text.category || 'без категории'))].sort()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка текстов...</p>
        </div>
      </div>
    )
  }

  return ( 
    <div className="space-y-6">
      {/* Статистика и поиск */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{texts.length}</div>
          <div className="text-sm text-blue-800">Всего текстов</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{filteredTexts.length}</div>
          <div className="text-sm text-green-800">Найдено</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
          <div className="text-sm text-purple-800">Категорий</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">
            {texts.filter(t => t.content.length > 100).length}
          </div>
          <div className="text-sm text-orange-800">Длинных текстов</div>
        </div>
      </div>

      {/* Панель управления */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Управление текстами</h3>
            <p className="text-gray-600 text-sm">Поиск и фильтрация текстового контента</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportTexts}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download size={16} />
              Экспорт
            </button>
            <button
              onClick={loadTexts}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload size={16} />
              Обновить
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск по ключу или содержанию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white appearance-none"
            >
              <option value="">Все категории</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(searchTerm || selectedCategory) && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">
              Фильтры: 
              {searchTerm && <span className="font-medium ml-1">поиск: "{searchTerm}"</span>}
              {selectedCategory && <span className="font-medium ml-1">категория: "{selectedCategory}"</span>}
            </span>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('')
              }}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {/* Список текстов */}
      <div className="space-y-4">
        {filteredTexts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="text-gray-400 mb-2">
              <Search size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500 text-lg mb-2">Тексты не найдены</p>
            <p className="text-gray-400 text-sm">
              {texts.length === 0 ? 'Тексты не загружены' : 'Попробуйте изменить параметры поиска'}
            </p>
          </div>
        ) : (
          filteredTexts.map((text) => (
            <div key={text.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded border text-gray-800">
                        {text.key}
                      </code>
                      {text.category && (
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                          {text.category}
                        </span>
                      )}
                    </div>
                    
                    {editingId === text.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[120px] resize-y"
                          placeholder="Введите текст..."
                        />
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>Длина текста: {editContent.length} символов</span>
                          <span className={editContent.length > 1000 ? 'text-red-500' : 'text-green-500'}>
                            {editContent.length}/1000
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className={`text-gray-700 whitespace-pre-wrap leading-relaxed ${
                          !expandedItems.has(text.id) && text.content.length > 200 ? 'line-clamp-3' : ''
                        }`}>
                          {text.content}
                        </p>
                        {text.content.length > 200 && (
                          <button
                            onClick={() => toggleExpand(text.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm mt-2 transition-colors"
                          >
                            {expandedItems.has(text.id) ? 'Свернуть' : 'Развернуть'}
                          </button>
                        )}
                        <div className="mt-3 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg inline-block">
                          Длина: {text.content.length} символов
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    {editingId === text.id ? (
                      <>
                        <button
                          onClick={() => updateText(text.id)}
                          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                        >
                          <Save size={16} />
                          Сохранить
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm"
                        >
                          <X size={16} />
                          Отмена
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(text)}
                          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium text-sm"
                        >
                          <Edit3 size={16} />
                          Редактировать
                        </button>
                        <button
                          onClick={() => deleteText(text.id)}
                          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
                        >
                          <Trash2 size={16} />
                          Удалить
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Пагинация или подсказка */}
      {filteredTexts.length > 10 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-blue-800 text-sm">
            Показано {filteredTexts.length} текстов. Используйте поиск для точного фильтра.
          </p>
        </div>
      )}
    </div>
  )
}