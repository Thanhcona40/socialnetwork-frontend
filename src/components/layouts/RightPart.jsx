import React, { useEffect } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import UserList from '../Messages/UserList';

const RightPart = () => {

    return ( // RightPart
      <div className='p-4 sm:p-5 lg:p-6'>
  
        {/* Banner quảng cáo */}
        <div className="p-4 rounded-lg">
          <h2 className="text-xl text-gray-500 mb-3">Advertisement</h2>
          <div className="space-y-4">
            {/* Quảng cáo Shopee */}
            <a
              href="https://shopee.vn/iPhone-13-128GB-Ch%C3%ADnh-H%C3%A3ng-VN-A-i.288286284.12619089637?sp_atk=2996c50c-e2cf-415c-9848-9bb3c35456a2&xptdk=2996c50c-e2cf-415c-9848-9bb3c35456a2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:bg-gray-100 p-2 rounded-lg"
            >
              <img
                src="https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m34hbk3bh4um55.webp"
                alt="Shopee Ad"
                className="w-24 h-24 rounded-md object-cover"
              />
              <div className="ml-3">
                <p className="text-sm font-medium">Duy nhất 04.04</p>
                <p className="text-xs text-gray-500">shopee.vn</p>
              </div>
            </a>
  
            {/* Quảng cáo Lazada */}
            <a
              href="https://shopee.vn/%C4%90%E1%BB%93ng-H%E1%BB%93-Th%C3%B4ng-Minh-HUAWEI-WATCH-GT5-Series-T%C3%ADnh-N%C4%83ng-Ch%E1%BA%A1y-B%E1%BB%99-V%C3%A0-%C4%90%E1%BA%A1p-Xe-M%E1%BB%9Bi-Thi%E1%BA%BFt-K%E1%BA%BF-G%C3%B3c-C%E1%BA%A1nh-Th%E1%BB%9Di-L%C6%B0%E1%BB%A3ng-2-Tu%E1%BA%A7n-i.93963889.28411691004?sp_atk=f8b277f2-250c-45b4-96e0-9563a6ce9614&xptdk=f8b277f2-250c-45b4-96e0-9563a6ce9614"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:bg-gray-100 p-2 rounded-lg"
            >
              <img
                src="https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m7zzkbe28kfi26.webp"
                alt="Lazada Ad"
                className="w-24 h-24 rounded-md object-cover"
              />
              <div className="ml-3">
                <p className="text-sm font-medium">Duy nhất 04.04</p>
                <p className="text-xs text-gray-500">shopee.vn</p>
              </div>
            </a>
          </div>
        </div>
  
        {/* Danh sách liên hệ */}
        <div className="mt-6 border-t-2">
          <p className="pt-3 pl-4 text-xl text-gray-500">Contacts</p>
          <UserList />
        </div>
      </div>
    );
  };
  
  export default RightPart;
  