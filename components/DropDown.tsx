import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function DropDown() {
  const [data, setData] = useState([]);
  const [dropdownStates, setDropdownStates] = useState({});

  const headingData = [
    "NAME OF THE HOLDING",
    "TICKET",
    "AVERAGE PRICE",
    "MARKET PRICE",
    "LAST CHANGE PERCENTAGE",
    "MARKTE VALUE IN BASE CCY",
  ];

  useEffect(() => {
    getPropertyData();
  }, []);

  const getPropertyData = async () => {
    try {
      const response = await axios.get(
        "https://canopy-frontend-task.now.sh/api/holdings"
      );

      const categorizedArrayAssetBased: any = {};

      response.data.payload.forEach((item: any) => {
        if (categorizedArrayAssetBased[item?.asset_class]) {
          categorizedArrayAssetBased[item?.asset_class].push(item);
        } else {
          categorizedArrayAssetBased[item?.asset_class] = [item];
        }
      });

      console.log(categorizedArrayAssetBased);

      setData(categorizedArrayAssetBased);
    } catch (error) {
      console.log(error);
    }
  };

  const getHeadings = (assetClass: any, index: number, length: number) => {
    return (
      <div
        className={`headingWithArrow flex flex-row justify-start items-center gap-5 cursor-pointer bg-white w-full sticky top-0 z-10 p-5 pb-3 pt-3 ${!(dropdownStates as any)[index] && "border-b"} `}
        onClick={() => toggleDropdown(index)}
      >
        <div
          className={`flex h-6 w-6 justify-center items-center rounded-full ${
            (dropdownStates as any)[index] ? "bg-[#5f50f0]" : "bg-[#f0f0f5]"
          }`}
        >
          {(dropdownStates as any)[index] ? (
            <FiChevronUp
              className={`w-6 h-6 ${
                (dropdownStates as any)[index]
                  ? "text-[#cfcdfa]"
                  : "text-[#c3cfde]"
              }`}
            />
          ) : (
            <FiChevronDown
              className={`w-6 h-6 ${
                (dropdownStates as any)[index]
                  ? "text-[#cfcdfa]"
                  : "text-[#c3cfde]"
              }`}
            />
          )}
        </div>
        <h2 className=" font-semibold text-[15px]">
          {assetClass} ({length})
        </h2>
      </div>
    );
  };

  const renderTableData = (items: any, index: number) => {
    return (
      <>
        <table
          className="border-spacing-0 border-separate rounded-2xl border shadow-md overflow-hidden w-full"
          key={index}
        >
          <thead className="">
            <tr className="">
              {headingData.map((column, index) => (
                <th key={index} className="text-[#9bb0c5] text-[12px] text-left py-2 px-4 border-b-2 h-[50px]">
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className=" bg-[#f5fafa] border-spacing-0 border-separate rounded-[20px]">
            {(items as any).map((singleItem: any, newIndex: number) => {
              return (
                <tr
                  key={newIndex}
                  className={`${
                    newIndex % 2 == 0 ? "bg-[#f5fafa]" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4 text-[#536898] text-[14px] h-[50px]">{singleItem?.name}</td>
                  <td className="py-2 px-4 text-[#536898] text-[14px] h-[50px]">{singleItem?.ticker}</td>
                  <td className="py-2 px-4 text-[#536898] text-[14px] h-[50px]">{singleItem?.asset_class}</td>
                  <td className="py-2 px-4 text-[#536898] text-[14px] h-[50px]">{singleItem?.avg_price}</td>
                  <td className="py-2 px-4 text-[#536898] text-[14px] h-[50px]">{singleItem?.asset_class}</td>
                  <td className="py-2 px-4 text-[#536898] text-[14px] h-[50px]">{singleItem?.asset_class}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };

  const toggleDropdown = (id: any) => {
    console.log(dropdownStates);
    setDropdownStates({
      ...dropdownStates,
      [id]: !(dropdownStates as any)[id],
    });
  };

  return (
    <div className="border rounded-md gap-3 flex flex-col h-full pt-2 justify-between">
      {Object.entries(data).map(([assetClass, items], index) => {
        return (
          <div
            key={index}
            className="flex items-start gap-2 flex-col w-full"
          >
            {/* RENDER EACH ASSET CATEGORY DROPDOWN CLICKABLE */}
            {getHeadings(assetClass, index, (items as any)?.length)}


            {/* DropDown List After An Asset Is Clicked */}
            {(dropdownStates as any)[index] && (
              <div className={`assetList flex items-start flex-col w-full gap-3 p-3 py-0 ${(dropdownStates as any)[index] && "border-b pb-5"}`}>
                {renderTableData(items, index)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
