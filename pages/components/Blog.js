import InfiniteScroll from "react-infinite-scroll-component";
import Image from 'next/image'
import { HiHeart, HiEye } from 'react-icons/hi'
import { AiOutlineLogout } from 'react-icons/ai'
import Loading from './Loading'
import { getSession } from "next-auth/react";

export default function Blog({fetchData,handlChange,handlKeyDownSearch,handleSignOut,formatNumber,nextphotos,handleLike}) {

      console.log(nextphotos);

    

    return (
      <InfiniteScroll
        dataLength={nextphotos.length}
        next={fetchData}
        hasMore={true}
        loader={<Loading />}
      >
        <main className='w-5/6 mx-auto'>
          <div className="flex items-center justify-between mb-4 mt-5 mx-auto">
            <form style={{ width: '250px' }} onKeyDown={handlKeyDownSearch} >
              <input className='w-full py-4 px-6 border-2 shadow ml-2 focus:border-blue-500 rounded-xl bg-slate-200' onChange={handlChange} type="search" placeholder="Search.." />
            </form>
            <button className='bg-slate-200 p-3 rounded-full shadow' onClick={handleSignOut}><AiOutlineLogout className='font-bold' size={22} /></button>
          </div>
          <div className='grid lg:grid-cols-3'>
            {nextphotos.map((photo) => (
              <div key={photo.id} className='mt-3 ml-2'>
                <Image className='rounded-xl object-cover' src={photo.urls.regular} width={345} height={300} />
                <div className="flex items-center justify-between">
                  <div className="user-info flex items-center">
                    <Image src={photo.user.profile_image.small} className='rounded-full object-cover' width={30} height={30} />
                    <p className='pl-2 font-bold'>{photo.user.first_name}</p>
                  </div>
                  <div className="flex">
                    <div className="flex items-center">
                      <HiHeart onClick={()=>handleLike(photo)} cursor='pointer' color={photo.liked_by_user === false ? '#aaa':'#ef5777'} size={18} />
                      <span className='semibold ml-1'>{formatNumber(photo.likes)}</span>
                    </div>
                    <div className="ml-3 flex items-center">
                      <HiEye cursor='pointer' color='#aaa' size={18} />
                      <span className='semibold ml-1'>{formatNumber(photo.views)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
  
          </div>
        </main>
      </InfiniteScroll>
    )
  
}

export const getStaticProps = async () => {
  const res = await axios.get(`${apiEndPoint}/photos/random?client_id=${clientId}&count=30`)
  const { data } = res
  return {
    props: {
      data
    }
  }
}


