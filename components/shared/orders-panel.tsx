'use client'

import { changeStatusOrder, deleteOrder } from "@/app/api/actions/actions";
import { Color, Order, Size } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AdminOrdersPanelProps {
  orders: Order[];
}

type OrderStatus = 'PENDING' | 'SUCCEEDED' | 'CANCELLED';

const renderOrderItems = (itemsJson: string) => {
    try {
        const items = JSON.parse(itemsJson);
        if (!Array.isArray(items)) return null;

        return (
            <div className="space-y-3">
                {items.map((item, index) => {
                    const jacketName = item.jacketItem?.jacket?.name || 'Неизвестный продукт';
                    const price = item.colors[0].price | 0;
                    const quantity = item.quantity || 1;
                    const image = item.colors[0].imageUrl
                    const colors = item.colors || item.jacketItem?.colors || [];
                    const sizes = item.sizes || [];
                    
                    const colorInfo = colors.length > 0 
                        ? `Цвет: ${colors.map((color: Color) => color.name).join(', ')}`
                        : '';
                    
                    const sizeInfo = sizes.length > 0 
                        ? `Размер: ${sizes.map((size: Size) => size.name).join(', ')}`
                        : '';
                    
                    const separator = colorInfo && sizeInfo ? ', ' : '';

                    return (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                            <div className="flex-1">
                                <img src={image} className="flex w-30"/>
                                <p className="font-medium text-gray-900">
                                    {jacketName} × {quantity}
                                </p>
                                {(colorInfo || sizeInfo) && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        {colorInfo}{separator}{sizeInfo}
                                    </p>
                                )}
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-gray-900">
                                    {price} ₽ × {quantity}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Итого: {price * quantity} ₽
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div className="flex justify-between items-center pt-3 border-t border-gray-300 mt-2">
                    <span className="font-semibold text-gray-900">Общая сумма заказа:</span>
                    <span className="font-bold text-lg text-gray-900">
                        {items.reduce((sum, item) => {
                            const price = item.colors[0].price | 0;
                            const quantity = item.quantity || 1;
                            return sum + (price * quantity);
                        }, 0)} ₽
                    </span>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Failed to parse items:', error);
        return (
            <div className="text-center py-4 text-gray-500">
                Не удалось загрузить состав заказа
            </div>
        );
    }
};


export const AdminOrdersPanel: React.FC<AdminOrdersPanelProps> = ({ 
  orders 
}) => {
  const [currentTab, setCurrentTab] = useState<'all' | OrderStatus>('all');
  const router = useRouter()

  const statusTabs = [
    { id: 'all' as const, label: 'Все заказы', count: orders.length },
    { id: 'PENDING' as const, label: 'Ожидание', count: orders.filter(order => order.status === 'PENDING').length },
    { id: 'SUCCEEDED' as const, label: 'Завершённые', count: orders.filter(order => order.status === 'SUCCEEDED').length },
    { id: 'CANCELLED' as const, label: 'Отменённые', count: orders.filter(order => order.status === 'CANCELLED').length },
  ];

  const filteredOrders = currentTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === currentTab);

  const handleDeleteOrder = (orderId: number) => {
    deleteOrder(orderId)
    router.refresh()
    console.log('Удаление заказа:', orderId);
  };

  const handleUpdateStatus = (orderId: number, newStatus: 'PENDING' | 'SUCCEEDED' | 'CANCELLED') => {
    changeStatusOrder(orderId,newStatus)
    router.refresh()
    console.log('Обновление статуса заказа:', orderId, 'на', newStatus);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'SUCCEEDED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Управление заказами</h1>
              <p className="text-gray-600 mt-2">Отслеживание и управление заказами покупателей</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Система активна</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            <div className="flex flex-col sm:flex-row gap-2 overflow-x-auto">
              {statusTabs.map((tab) => (
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
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    currentTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {currentTab === 'all' ? 'Все заказы' : statusTabs.find(tab => tab.id === currentTab)?.label}
                </h2>
                <p className="text-gray-600 mt-2">
                  {filteredOrders.length} из {orders.length} заказов
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Заказы не найдены</h3>
                <p className="text-gray-600">Нет заказов с выбранным статусом</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Заказ #{String(order.id).toUpperCase()}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Создан: {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status as OrderStatus)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-600">Клиент</p>
                        <p className="font-medium text-gray-900">{order.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Телефон</p>
                        <p className="font-medium text-gray-900">{order.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{order.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Сумма</p>
                        <p className="font-medium text-gray-900">{order.totalAmount} ₽</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-2">Адрес доставки</p>
                      <p className="text-gray-900">{order.address}</p>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-3">Состав заказа:</p>
                      <div className="bg-gray-50 rounded-lg p-4">
                      {renderOrderItems(String(order.items))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                        className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="PENDING">Ожидание</option>
                        <option value="SUCCEEDED">Завершён</option>
                        <option value="CANCELLED">Отменён</option>
                      </select>
                      
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setCurrentTab('PENDING')}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-yellow-500 hover:shadow-md transition-all duration-200 group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                <span className="text-yellow-600 font-bold">⏰</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ожидающие</h3>
                <p className="text-sm text-gray-600">{statusTabs.find(tab => tab.id === 'PENDING')?.count} заказов</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('SUCCEEDED')}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-200 group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <span className="text-green-600 font-bold">✅</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Завершённые</h3>
                <p className="text-sm text-gray-600">{statusTabs.find(tab => tab.id === 'SUCCEEDED')?.count} заказов</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('all')}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all duration-200 group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <span className="text-purple-600 font-bold">📋</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Все заказы</h3>
                <p className="text-sm text-gray-600">{orders.length} всего</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};