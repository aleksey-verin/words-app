import { UserDictionary } from "../dictionary/types";

export function getRandomWords(words: UserDictionary, amount: number): UserDictionary {
  // Фильтруем массив, оставляя только объекты с progress меньше 100
  const filteredWords = words.filter(wordObj => wordObj.progress < 100);

  // Создаем глубокую копию отфильтрованного массива для обеспечения иммутабельности
  const deepCopiedWords = JSON.parse(JSON.stringify(filteredWords));

  // Алгоритм Фишера-Йетса для случайного перемешивания массива
  for (let i = deepCopiedWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deepCopiedWords[i], deepCopiedWords[j]] = [deepCopiedWords[j], deepCopiedWords[i]];
  }

  // Возвращаем первые `amount` объектов
  return deepCopiedWords.slice(0, amount);
}