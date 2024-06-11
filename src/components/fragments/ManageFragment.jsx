import React, { useState } from "react";
import { ListTodo } from "lucide-react";
import { v4 as uuid } from "uuid";

export const ManageFragment = () => {
  return (
    <>
      <div className="dashboard-main-header">
        <div>
          <h1 className="heading-100">Manage</h1>
          <p className="heading-50 text-head text-primary-500">
            Mengelola pengaturan akun Anda seperti membuat dan menghapus
            kategori.
          </p>
        </div>
      </div>
      <div className="wrapper-category">
        <div className="category-head">
          <div className="flex-center gap">
            <ListTodo className="icon-category-head" />
            <h1 className="heading-200 fw-semibold text-primary-700">
              Kategori
            </h1>
          </div>
          <button className="button-category"> Tambah Kategori</button>
        </div>
        <div className="category-content h-full ">
          <div className="category-notfound">
            <h3>Tidak Ada kategori.</h3>
            <p>Silahkan tambahkan kategori baru.</p>
          </div>
        </div>
        <div className="modal-overlay"></div>
      </div>
    </>
  );
};
