import React from "react";
import { Plus, Minus } from "lucide-react";
export const DashboardFragment = () => {
  return (
    <div className="dashboard-main-header">
      <div>
        <h1 className="heading-100 font-bold">Hallo, Anwar Hakim! 👋</h1>
      </div>
      <div className="flex-center gap">
        <button className="pengeluaran flex-center">
          <Plus className="mr-1" width={20} height={20} />
          <p>
            {" "}
            Pemasukan <span className="ml-3">🤑</span>
          </p>
        </button>
        <button className="pemasukan flex-center">
          <Minus className="mr-1" width={20} height={20} />
          <p>
            {" "}
            Pengeluaran <span className="ml-2">😤</span>
          </p>
        </button>
      </div>
    </div>
  );
};
