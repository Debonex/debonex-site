import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import Button from "components/common/headless/Button";
import Input from "components/common/Input";
import LockSvg from "components/svg/Lock.svg";
import { FC, Fragment, useEffect, useState } from "react";

const NotionSyncModal: FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const syncNotion = () => {
    setLoading(true);
    fetch("/api/refresh-notion", {
      method: "post",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          onClose();
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => setPassword(""), [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "w-full max-w-md transform overflow-hidden rounded-2xl bg-light-dim p-6 text-left align-middle shadow-xl transition-all",
                  "dark:bg-dark-deep"
                )}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 dark:text-white"
                >
                  Sync notes
                </Dialog.Title>

                <Input
                  className="mt-2"
                  value={password}
                  type="password"
                  onChange={(v) => setPassword(v)}
                  prepend={
                    <LockSvg className="mr-2 h-4 w-4 fill-black dark:fill-white" />
                  }
                />

                <div className="mt-4 flex justify-end">
                  <Button
                    className="w-24 rounded-md bg-primary-main py-2 text-center text-white transition-colors hover:bg-primary-main/90"
                    onClick={syncNotion}
                    loading={loading}
                  >
                    Confirm
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NotionSyncModal;
