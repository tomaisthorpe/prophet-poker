import clsx from "clsx";

export default function Layout({
  children,
  noNav,
}: {
  children: React.ReactNode;
  noNav?: boolean;
}) {
  return (
    <div className="min-h-full flex flex-col">
      {!noNav && (
        <nav className="border-b border-gray-200 bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  🎴🃏
                  <div className="ml-2 text-gray-300">Prophet Poker</div>
                </div>
                {/* <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href={"#"}
                    className={clsx(
                      false
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    Planning Session 1
                  </a>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </nav>
      )}
      {children}
    </div>
  );
}
