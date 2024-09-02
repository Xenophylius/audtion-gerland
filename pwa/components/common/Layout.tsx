import { ReactNode, useState } from "react";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import NavbarSide from '../NavbarSide';

const Layout = ({
  children,
  dehydratedState,
}: {
  children: ReactNode;
  dehydratedState: DehydratedState;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="fixed ">
        <NavbarSide />
      </div>
      <div className="w-10/12 absolute right-0">
        <Hydrate state={dehydratedState}>{children}</Hydrate>
      </div>
    </QueryClientProvider>
  );
};

export default Layout;
