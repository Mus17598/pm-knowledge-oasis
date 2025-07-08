import React, { createContext, useContext, useState } from 'react';

const ResourceModalContext = createContext({
  modalOpen: false,
  setModalOpen: (open: boolean) => {},
});

export const ResourceModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <ResourceModalContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </ResourceModalContext.Provider>
  );
};

export const useResourceModal = () => useContext(ResourceModalContext); 