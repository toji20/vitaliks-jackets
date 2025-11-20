import Head from 'next/head';
import Link from 'next/link';

export const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Страница не найдена | Магазин мужских курток</title>
        <meta name="description" content="Страница не найдена" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <header className="border-b border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="text-2xl font-bold text-black">
              JACKET STORE
            </Link>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center max-w-2xl">
            <div className="relative mb-8">
              <div className="text-9xl font-bold text-black opacity-5 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-black">404</div>
              </div>
              
              <div className="absolute -left-4 top-1/2 w-8 h-0.5 bg-black transform -rotate-45"></div>
              <div className="absolute -right-4 top-1/2 w-8 h-0.5 bg-black transform rotate-45"></div>
            </div>

            <h1 className="text-3xl font-bold text-black mb-4">
              Страница не найдена
            </h1>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              К сожалению, запрашиваемая страница не существует. 
              Возможно, она была перемещена или удалена.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/"
                className="bg-black text-white px-8 py-3 rounded-none font-medium hover:bg-gray-800 transition-colors duration-200 border border-black"
              >
                На главную
              </Link>
              <Link 
                href="/catalog"
                className="bg-white text-black px-8 py-3 rounded-none font-medium hover:bg-gray-50 transition-colors duration-200 border border-gray-300"
              >
                В каталог
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-gray-500 text-sm">
                Нужна помощь?{' '}
                <Link href="/contacts" className="text-black underline hover:no-underline">
                  Свяжитесь с нами
                </Link>
              </p>
            </div>
          </div>
        </main>

        <footer className="border-t border-gray-100 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Магазин мужских курток. Все права защищены.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default NotFoundPage;