'use client'

import { Category, Order } from "@prisma/client";
import { useState } from "react"
import { JacketList, JacketWithRelations } from "./jacket-list";
import { TextEditor } from "./admin-text-editor";
import { JacketForm } from "./jacket-add";
import { AdminOrdersPanel } from "./orders-panel";
import { CategoryManager } from "./admin-category-manager";

interface AdminPanelWrapperProps {
  categories: Category[];
  categoriesI: Category[];
  jackets: JacketWithRelations[];
  orders: Order[];
}

type TabType = 'texts' | 'add' | 'list' | 'orders' | 'categories';

export const AdminPanelWrapper: React.FC<AdminPanelWrapperProps> = ({ 
  categories, 
  jackets,
  orders,
  categoriesI,
}) => {
  const [currentTab, setCurrentTab] = useState<TabType>('texts');

  const tabs = [
    { id: 'texts' as const, label: 'Редактор текстов', count: null },
    { id: 'add' as const, label: 'Добавить товар', count: null },
    { id: 'list' as const, label: 'Список товаров', count: jackets.length },
    { id: 'orders' as const, label: 'Управление заказами', count: orders.length },
    { id: 'categories' as const, label: 'Категории', count: categories.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">

<div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Панель администратора</h1>
              <p className="text-gray-600 mt-2">Управление контентом, товарами и заказами магазина</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Система активна</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            <div className="flex flex-col sm:flex-row gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    currentTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      currentTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
          {currentTab === 'texts' && (
            <div>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">Редактор текстов</h2>
                <p className="text-gray-600 mt-2">Управление всеми текстовыми элементами сайта</p>
              </div>
              <div className="p-6">
                <TextEditor/>
              </div>
            </div>
          )}

          {currentTab === 'add' && (
            <div>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">Добавление нового товара</h2>
                <p className="text-gray-600 mt-2">Заполните информацию о новой куртке</p>
              </div>
              <div className="p-6">
                <JacketForm categories={categories}/>
              </div>
            </div>
          )}

          {currentTab === 'list' && (
            <div>
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Список товаров</h2>
                    <p className="text-gray-600 mt-2">Все куртки в каталоге ({jackets.length})</p>
                  </div>
                  <button
                    onClick={() => setCurrentTab('add')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <span>+</span>
                    Добавить куртку
                  </button>
                </div>
              </div>
              <div className="p-6">
                <JacketList jackets={jackets}/>
              </div>
            </div>
          )}

{currentTab === 'orders' && (
            <div>
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Управление заказами</h2>
                    <p className="text-gray-600 mt-2">Отслеживание и управление заказами покупателей</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Всего заказов: {orders.length}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <AdminOrdersPanel orders={orders}/>
              </div>
            </div>
          )}

          {currentTab === 'categories' && (
            <div>
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Управление категориями</h2>
                    <p className="text-gray-600 mt-2">Создание и управление категориями</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Всего категорий: {categoriesI.length}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <CategoryManager categories={categoriesI}/>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <button
            onClick={() => setCurrentTab('add')}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <span className="text-blue-600 font-bold">+</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Добавить товар</h3>
                <p className="text-sm text-gray-600">Создать новую куртку</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('list')}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-200 group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <span className="text-green-600 font-bold">📦</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Управление товарами</h3>
                <p className="text-sm text-gray-600">{jackets.length} товаров в каталоге</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('orders')}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all duration-200 group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <span className="text-orange-600 font-bold">📋</span>

</div>
              <div>
                <h3 className="font-semibold text-gray-900">Управление заказами</h3>
                <p className="text-sm text-gray-600">{orders.length} заказов</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('texts')}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all duration-200 group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <span className="text-purple-600 font-bold">📝</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Редактор текстов</h3>
                <p className="text-sm text-gray-600">SEO и контент</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('categories')}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-pink-500 hover:shadow-md transition-all duration-200 group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                <span className="text-pink-600 font-bold">📁</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Категории галереи</h3>
                <p className="text-sm text-gray-600">{categories.length} категорий</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}