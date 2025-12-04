import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { StorageItem, StorageState } from '@/types';

export const useStorageStore = create<StorageState>()(
  persist(
    (set, get) => ({
      storageList: [],
      setStorageList: (storageList: StorageItem[]) => set({ storageList }),
      addStorage: (storage: StorageItem) =>
        set((state) => ({ storageList: [...state.storageList, storage] })),
      deleteStorage: (id: string) =>
        set((state) => ({
          storageList: state.storageList.filter((storage) => storage.id !== id),
        })),
      updateStorage: (storage: StorageItem) =>
        set((state) => ({
          storageList: state.storageList.map((s) =>
            s.id === storage.id ? storage : s
          ),
        })),
      getStorageList: () => get().storageList,
    }),
    {
      name: 'storage-list',
      partialize: (state) => ({ storageList: state.storageList }),
    }
  )
);
