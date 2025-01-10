"use client";

import { UsersTable } from "@/app/admin/users/_components/UsersTable";
import { fetchUsers } from "@/app/admin/users/actions";
import { Pagination } from "@/components/Pagination";
import { PaginationStatus } from "@/components/PaginationStatus";
import { usePagination } from "@/hooks/usePagination";
import { UserEntity } from "@repo/core";

const Page = () => {
  const {
    loading,
    items: users,
    pagination,
    meta,
    currentPage,
    onPaginationClick,
    canEnablePaginationItem,
  } = usePagination<UserEntity>({
    fetchItems: fetchUsers,
  });

  if (loading) return <span>loading...</span>;

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <UsersTable users={users} />

      <PaginationStatus meta={meta} />

      <Pagination
        canEnablePaginationItem={canEnablePaginationItem}
        currentPage={currentPage}
        items={pagination}
        onPaginationClick={onPaginationClick}
      />
    </div>
  );
};

export default Page;
