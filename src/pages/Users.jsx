import Layout from "@/layouts/Layout";
import React from "react";

const Users = () => {
  return (
    <Layout>
      <div className="w-full h-screen p-8 flex flex-col gap-4 overflow-y-auto">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight first:mt-0 w-full">
          Users
        </h2>
      </div>
    </Layout>
  );
};

export default Users;
