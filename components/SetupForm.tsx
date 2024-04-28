import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Page from "@/components/Page";
import { SessionConfig } from "@/sessions/host";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Head from "next/head";

export default function SetupForm({
  onCreateSession,
}: {
  onCreateSession: (cfg: SessionConfig) => void;
}) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onCreateSession({ name: e.currentTarget.sessionName.value });
  };

  const errorMsg = "";
  return (
    <Layout noNav>
      <Page>
        <Head>
          <title>Start New Session | Prophet Poker</title>
        </Head>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-3xl text-center">🎴🃏</div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Start new session
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600"></p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            {errorMsg && (
              <div className="mt-2 rounded-md bg-red-50 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {errorMsg}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
              <form onSubmit={onSubmit} className="space-y-6" method="POST">
                <Input label="Session Name" name="sessionName" required />

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Start session
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Page>
    </Layout>
  );
}
