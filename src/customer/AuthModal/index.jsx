import React, { useState } from 'react';
import { Dialog, DialogPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

const AuthModal = ({ open, handleClose }) => {
  const [tab, setTab] = useState(0);

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg max-w-md w-full">
          <TabGroup selectedIndex={tab} onChange={setTab}>
            <TabList className="flex border-b">
              <Tab className={({ selected }) => `flex-1 py-3 text-center text-sm font-medium ${selected ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
                Sign In
              </Tab>
              <Tab className={({ selected }) => `flex-1 py-3 text-center text-sm font-medium ${selected ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
                Register
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel><Login /></TabPanel>
              <TabPanel><Register /></TabPanel>
            </TabPanels>
          </TabGroup>
          <div className="p-4 border-t">
            <button onClick={handleClose} className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Close</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AuthModal;
