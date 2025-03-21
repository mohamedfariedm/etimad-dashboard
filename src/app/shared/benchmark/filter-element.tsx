'use client';

import React, { useEffect, useState } from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from '@/components/controlled-table/date-field';
import StatusField from '@/components/controlled-table/status-field';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/format-date';
import { useMedia } from '@/hooks/use-media';
import CreatableSelect from 'react-select'


type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  userDetails: {label: string, value: string}[] | [];
  retailerDetails: {label: string, value: string, stores: {name: string, id: number}[]}[] | [];
  // regionDetails: {label: string, value: string, city: any}[] | [];
  productDetails: {label: string, value: string}[] | [];
  brandDetails: {label: string, value: string}[] | [];
  categoriesDetails: any;
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  userDetails,
  retailerDetails,
  productDetails,
  brandDetails,
  categoriesDetails,

}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  // const [selectedRegion, setSelectedRegion] = useState<{label: string, value: string}[]>([])
  const [seletedSubCategory, setSelectedSubCategory] = useState<{id: number, name: string, children: any}[] | []>(categoriesDetails?.find(((cat: any) => cat?.id == filters['filter_category']))?.children||[])
  const [selectedSubSubCat, setSelecedSubSubCat] = useState<{name: string, id: string}[]>(seletedSubCategory?.find(((cat: any) => cat?.id == filters['filter_sub_category']))?.children||[])
  const [selectedRetailer, setSelectedRetailer] = useState<{label: string, value: string}[] | []>(filters['filter_retailer']?retailerDetails?.find((retailer: any) => retailer?.value == filters['filter_retailer'])?.stores?.map((store: any) => ({label: store?.name+" ( "+store?.store_code+" ) ", value: String(store?.id)})) || []:[])
  // useEffect(() => {
  //   if(filters['filter_region']){
  //     setSelectedRegion(regionDetails?.find((regions: any) => regions?.value == filters['filter_region'])?.city?.map((city: any) => ({
  //       label: city?.name,
  //       value: String(city?.id)
  //     })) || [])
  //   }
  // }, [])
  const handleReset = () => {
    Object.keys(filters).forEach((filter: string) => updateFilter(filter, ''))
  }
  return (
    <>
      <div className='flex gap-2'>
        <DateFiled
            selected={filters['offerDateFrom_from'] ? new Date(filters['offerDateFrom_from']) : null}
            onChange={(date: any) => {
            updateFilter('offerDateFrom_from', formatDate(date, 'YYYY-MM-DD'));
            }}
            placeholderText="Select start date"
            {...(isMediumScreen && {
            inputProps: {
                label: 'Start Offer Date from',
                labelClassName: 'font-medium text-gray-700',
            },
            })}
        />
        <DateFiled
            selected={filters['offerDateFrom_to'] ? new Date(filters['offerDateFrom_to']) : null}
            onChange={(date: any) => {
            updateFilter('offerDateFrom_to', formatDate(date, 'YYYY-MM-DD'));
            }}
            placeholderText="Select start date"
            {...(isMediumScreen && {
            inputProps: {
                label: 'Start Offer Date to',
                labelClassName: 'font-medium text-gray-700',
            },
            })}
        />
        </div>
      <div className='flex gap-2'>
        <DateFiled
            selected={filters['offerDateTo_from'] ? new Date(filters['offerDateTo_from']) : null}
            onChange={(date: any) => {
            updateFilter('offerDateTo_from', formatDate(date, 'YYYY-MM-DD'));
            }}
            placeholderText="Select End date"
            {...(isMediumScreen && {
            inputProps: {
                label: 'End Offer Date from',
                labelClassName: 'font-medium text-gray-700',
            },
            })}
        />
        <DateFiled
            selected={filters['offerDateTo_to'] ? new Date(filters['offerDateTo_to']) : null}
            onChange={(date: any) => {
            updateFilter('offerDateTo_to', formatDate(date, 'YYYY-MM-DD'));
            }}
            placeholderText="Select End date"
            {...(isMediumScreen && {
            inputProps: {
                label: 'End Offer Date to',
                labelClassName: 'font-medium text-gray-700',
            },
            })}
        />
        </div>


        <div className='flex gap-2'>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> User</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={userDetails}
          value={filters['filter_user']?{label:userDetails?.find((option) => option.value === filters['filter_user'])?.label,value:filters['filter_user']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select User'
          onChange={(value: any) => {
            updateFilter('filter_user', value.value);
          }}
        />
      </div>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> Model</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={productDetails}
          value={filters['search_model']?{label:productDetails?.find((option) => option.value === filters['search_model'])?.label,value:filters['search_model']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select User'
          onChange={(value: any) => {
            updateFilter('search_model', value.value);
          }}
        />
      </div>
        </div>
              <div className='flex gap-2'>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> Retailer</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={retailerDetails}
          value={filters['filter_retailer']?{label:retailerDetails?.find((option) => option.value === filters['filter_retailer'])?.label,value:filters['filter_retailer']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Retailer'
          onChange={(value: any) => {
            updateFilter('filter_retailer', value.value);
            setSelectedRetailer(retailerDetails?.find((retailer: any) => retailer?.value == value.value)?.stores?.map((store: any) => ({label: store?.name+" ( "+store?.store_code+" ) ", value: String(store?.id)})) || [])
            updateFilter('filter_store', "");
          }}
        />

        </div>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> Store</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={selectedRetailer}
          value={filters['filter_store']?{label:selectedRetailer?.find((option) => option.value === filters['filter_store'])?.label,value:filters['filter_store']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Store'
          onChange={(value: any) => {
            updateFilter('filter_store', value.value);
          }}
        />
        </div>
      </div>
      <div className='flex gap-2'>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> BG</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={categoriesDetails}
          value={filters['filter_category']?{label:categoriesDetails?.find((option:any) => option.value === filters['filter_category'])?.label,value:filters['filter_category']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select BG'
          onChange={(value: any) => {
            updateFilter('filter_category', value.value);
            updateFilter('filter_sub_category', "");
            updateFilter('filter_sub_sub_category', "");            
            setSelectedSubCategory(categoriesDetails?.find(((cat: any) => cat?.id == value.value))?.children)
          }}
        />

        </div>
        <div className='w-full'>
          <label className='font-medium text-gray-700'>VCP</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={seletedSubCategory?.map((cat:any) => ({label: cat?.name, value: cat?.id}))}
          value={filters['filter_sub_category']?{label:seletedSubCategory?.find((option) => option.id == filters['filter_sub_category'])?.name,value:filters['filter_sub_category']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select VCP'
          onChange={(value: any) => {
            console.log(value);
            updateFilter('filter_sub_category', String(value.value));
            updateFilter('filter_sub_sub_category', "");
            setSelecedSubSubCat(seletedSubCategory?.find(((cat: any) => cat?.id == value.value))?.children)           
          }}
        />

        </div>
      </div>
      <div className='flex gap-2 w-full'>
      <div className='w-full'>
          <label className='font-medium text-gray-700'>BU</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={selectedSubSubCat?.map((cat:any) => ({label: cat?.name, value: cat?.id}))}
          value={filters['filter_sub_sub_category']?{label:selectedSubSubCat?.find((option) => option.id == filters['filter_sub_sub_category'])?.name,value:filters['filter_sub_sub_category']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select BU'
          onChange={(value: any) => {
            updateFilter('filter_sub_sub_category', String(value.value));
          }}
        />

        </div>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> Brand</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={brandDetails}
          value={filters['filter_brand']?{label:brandDetails?.find((option) => option.value === filters['filter_brand'])?.label,value:filters['filter_brand']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Brand'
          onChange={(value: any) => {
            updateFilter('filter_brand', value.value);
          }}
        />

        </div>
      </div>





      {/* {isFiltered ?  */}
      
        <Button
          size="sm"
          onClick={handleReset}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      
       {/* : null} */}
    </>
  );
}
