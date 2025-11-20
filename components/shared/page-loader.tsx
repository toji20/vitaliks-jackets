// // components/LoadingScreen.tsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function LoadingScreen() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [progress, setProgress] = useState(0);
//   const [showMusicPrompt, setShowMusicPrompt] = useState(false);
//   const [showContent, setShowContent] = useState(false);
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(timer);
//           // Сначала показываем промпт о музыке
//           setShowMusicPrompt(true);
//           // Через некоторое время скрываем промпт и показываем контент
//           setTimeout(() => {
//             setShowMusicPrompt(false);
//             setTimeout(() => {
//               setIsLoading(false);
//             }, 500);
//           }, 5000);
//           return 100;
//         }
//         return prev + 2;
//       });
//     }, 100);

//     return () => clearInterval(timer);
//   }, []);

//   const handleClick = () => {
//     if (!audioRef.current) {
//       audioRef.current = new Audio();
//       // Добавьте URL вашей музыки здесь
//       // audioRef.current.src = '/music/ambient.mp3';
//     }
    
//     if (audioRef.current.paused) {
//       audioRef.current.play().catch(console.error);
//     } else {
//       audioRef.current.pause();
//     }
    
//     setShowMusicPrompt(false);
//     // Если кликнули во время промпта, сразу переходим к контенту
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 300);
//   };

//   const jacketVariants = {
//     initial: { scale: 0, rotate: -180 },
//     animate: { 
//       scale: 1, 
//       rotate: 0,
//       transition: { 
//         type: "spring", 
//         stiffness: 100,
//         damping: 15
//       }
//     }
//   };

//   // Анимация для битов эквалайзера
//   const barVariants = {
//     animate: {
//       height: ["4px", "20px", "4px"],
//       transition: {
//         duration: 0.8,
//         repeat: Infinity,
//         repeatType: "reverse",
//         ease: "easeInOut"
//       }
//     }
//   };

//   return (
//     <>
//       <AnimatePresence>
//         {isLoading && (
//           <motion.div
//             className="fixed inset-0 z-150 flex flex-col items-center justify-center bg-black text-white overflow-hidden cursor-pointer"
//             initial={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.8 }}
//             onClick={handleClick}
//           >
//             {/* Анимированный фон с движущимися линиями */}
//             <div className="absolute inset-0 opacity-10">
//               {[...Array(10)].map((_, i) => (
//                 <motion.div
//                   key={i}
//                   className="absolute h-px bg-white"
//                   style={{
//                     top:` ${(i + 1) * 10}%`,
//                     left: 0,
//                   }}
//                   initial={{ x: '-100%' }}
//                   animate={{ x: '100%' }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     delay: i * 0.3,
//                     ease: "linear"
//                   }}
//                 />
//               ))}
//             </div>

//             {/* Основная анимация куртки */}
//             <div className="relative z-10 flex flex-col items-center space-y-8">
//               {/* Анимированная куртка */}
//               <motion.div
//                 className="relative"
//                 variants={jacketVariants}
//                 initial="initial"
//                 animate="animate"
//               >
//                 {/* Воротник - улучшенная версия */}
//                 <div className="relative mb-2">
//                   <motion.div
//                     className="w-40 h-8 border-2 border-amber-600 rounded-t-full relative overflow-hidden"
//                     initial={{ scaleX: 0 }}
//                     animate={{ scaleX: 1 }}
//                     transition={{ duration: 0.8, delay: 0.3 }}
//                   >
//                     {/* Внутренняя деталь воротника */}
//                     <motion.div
//                       className="absolute inset-1 border border-amber-400/50 rounded-t-full"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 1 }}
//                     />
//                   </motion.div>
                  
//                   {/* Анимация "разворачивания" воротника */}
//                   <motion.div
//                     className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-32 h-3 bg-amber-500 rounded-full"
//                     initial={{ scale: 0, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 0.7 }}
//                     transition={{ 
//                       delay: 0.8,
//                       type: "spring",
//                       stiffness: 200
//                     }}
//                   />
//                 </div>
                
//                 {/* Основная часть */}
//                 <div className="w-40 h-48 border-2 border-white relative bg-gradient-to-b from-gray-900 to-black">
//                   {/* Молния */}
//                   <motion.div
//                     className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-amber-400 to-amber-600 transform -translate-x-1/2"
//                     initial={{ height: 0 }}
//                     animate={{ height: '100%' }}
//                     transition={{ duration: 1.5, delay: 0.5 }}
//                   />
                  
//                   {/* Декоративные элементы молнии */}
//                   <motion.div
//                     className="absolute left-1/2 top-4 w-2 h-4 bg-amber-500 rounded-full transform -translate-x-1/2"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 1.8, type: "spring" }}
//                   />
//                   <motion.div
//                     className="absolute left-1/2 bottom-8 w-2 h-4 bg-amber-500 rounded-full transform -translate-x-1/2"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 2, type: "spring" }}
//                   />
                  
//                   {/* Карманы */}
//                   <motion.div
//                     className="absolute left-4 top-16 w-8 h-10 border border-white rounded bg-gray-800/50"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 1, type: "spring" }}
//                   >
//                     <motion.div
//                       className="absolute top-1 left-1/2 w-4 h-0.5 bg-amber-400 transform -translate-x-1/2"
//                       initial={{ width: 0 }}
//                       animate={{ width: '16px' }}
//                       transition={{ delay: 1.5 }}
//                     />
//                   </motion.div>
//                   <motion.div
//                     className="absolute right-4 top-16 w-8 h-10 border border-white rounded bg-gray-800/50"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 1.2, type: "spring" }}
//                   >
//                     <motion.div
//                       className="absolute top-1 left-1/2 w-4 h-0.5 bg-amber-400 transform -translate-x-1/2"
//                       initial={{ width: 0 }}
//                       animate={{ width: '16px' }}
//                       transition={{ delay: 1.7 }}
//                     />
//                   </motion.div>
//                 </div>
//               </motion.div>

//               {/* Прогресс бар */}
//               <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
//                 <motion.div
//                   className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
//                   initial={{ width: 0 }}
//                   animate={{ width: `${progress}%` }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </div>

//               {/* Текст загрузки */}
//               <motion.div
//                 className="text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <h1 className="text-2xl font-light mb-2">JACKET STORE</h1>
//                 <p className="text-gray-400 text-sm">
//                   Подготовка стиля {progress}%
//                 </p>
//               </motion.div>
//             </div>

//             {/* Всплывающее напоминание о музыке с анимацией битов */}
//             <AnimatePresence>
//               {showMusicPrompt && (
//                 <motion.div
//                   className="absolute z-151 bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-amber-500/50 rounded-2xl px-8 py-6 text-center min-w-80"
//                   initial={{ opacity: 0, y: 50, scale: 0.8 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: 30, scale: 0.9 }}
//                   transition={{ 
//                     duration: 0.6,
//                     type: "spring",
//                     stiffness: 200
//                   }}
//                 >
//                   <div className="flex flex-col items-center space-y-4">
//                     {/* Анимированный эквалайзер */}
//                     <div className="flex items-end justify-center space-x-2 h-8">
//                       {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((heightMultiplier, index) => (
//                         <motion.div
//                           key={index}
//                           className="w-1.5 bg-gradient-to-t from-amber-400 to-amber-600 rounded-t-sm"
//                           style={{ height: `${heightMultiplier * 4}px` }}
//                           variants={barVariants}
//                           animate="animate"
//                           transition={{
//                             duration: 0.8,
//                             repeat: Infinity,
//                             repeatType: "reverse",
//                             delay: index * 0.1,
//                             ease: "easeInOut"
//                           }}
//                         />
//                       ))}
//                     </div>

//                     {/* Текст с иконкой */}
//                     <div className="flex items-center space-x-3 text-amber-300">
//                       <motion.div
//                         animate={{ 
//                           scale: [1, 1.2, 1],
//                           rotate: [0, 5, -5, 0]
//                         }}
//                         transition={{ 
//                           duration: 2, 
//                           repeat: Infinity,
//                           repeatType: "loop"
//                         }}
//                         className="text-xl"
//                       >
//                         🎵
//                       </motion.div>
//                       <div className="text-center">
//                         <p className="text-lg font-medium">Нажмите на экран</p>
//                         <p className="text-amber-400/80 text-sm">чтобы включить фоновую музыку</p>
//                       </div>
//                       <motion.div
//                         animate={{ 
//                           scale: [1, 1.2, 1],
//                           rotate: [0, -5, 5, 0]
//                         }}
//                         transition={{ 
//                           duration: 2, 
//                           repeat: Infinity,
//                           repeatType: "loop",
//                           delay: 0.5
//                         }}
//                         className="text-xl"
//                       >
//                         🎧
//                       </motion.div>
//                     </div>

//                     {/* Пульсирующая подсказка */}
//                     <motion.div
//                       className="flex items-center space-x-2 text-amber-500/70 text-xs"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.8 }}
//                     >
//                       <motion.span
//                         animate={{ opacity: [0.3, 1, 0.3] }}
//                         transition={{ duration: 1.5, repeat: Infinity }}
//                       >
//                         ↓
//                       </motion.span>
//                       <span>Кликните в любом месте</span>
//                       <motion.span
//                         animate={{ opacity: [0.3, 1, 0.3] }}
//                         transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
//                       >
//                         ↓
//                       </motion.span>
//                     </motion.div>

//                     {/* Таймер исчезновения */}
//                     <motion.div
//                       className="h-1 bg-amber-500/30 rounded-full mt-2 w-full"
//                       initial={{ width: '100%' }}
//                       animate={{ width: 0 }}
//                       transition={{ duration: 5, ease: "linear" }}
//                     />
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Дополнительная подсказка в углу */}
//             <AnimatePresence>
//               {showMusicPrompt && (
//                 <motion.div
//                   className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-amber-500/30"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <motion.div
//                       animate={{ scale: [1, 1.1, 1] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                       className="text-amber-400 text-sm"
//                     >
//                       🔊
//                     </motion.div>
//                     <span className="text-xs text-amber-200/80">Музыка</span>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }