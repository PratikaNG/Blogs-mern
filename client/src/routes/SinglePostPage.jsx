import React from "react";
import IkImage from "../components/IkImage";
import { Link, useParams } from "react-router";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import useQuery from "@tanstack/react-query"
import axios from "axios"
import {format} from "timeago.js"

 const fetchPost = async(slug) =>{
    const slug = useParams()
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
    return res.data
  }
const SinglePostPage = () => {
  
 
  const {isPending,error,data} = useQuery({
    queryKey:["post",slug],
    queryFn:()=>fetchPost(slug)
  })
  if (isPending) return 'Loading...'
  
  if (error) return 'An error has occurred: ' + error.message
  if(!data) return "Post not found!"
  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="md:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl  xl:text-4xl wxl:text-5xl font-medium">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            {/* {data.title} */}
          </h1>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Written By</span>
            <Link className="text-blue-800">John Doe</Link>
            {/* <Link className="text-blue-800">{data.user.username}</Link> */}
            <span>on</span>
            <Link className="text-blue-800">Web Design</Link>
            <Link className="text-blue-800">{data.category}</Link>
            <span>2 days ago</span>
             {/* <span>{format(data.createdAt)}</span> */}
          </div>
          <p className="text-gray-500 font-medium">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
            blanditiis fugiat, vero necessitatibus ullam distinctio nisi quas
            repellendus! Mollitia nulla omnis ratione quasi, minus fugiat
            accusantium debitis exercitationem ex laudantium.
            {/* {data.desc} */}
          </p>
        </div>
        <div className="hidden md:block w-2/5">
          <IkImage src="postImg.jpeg" w="600" className="rounded-2xl" />
          {/* {data.user.img && <IkImage src={data.user.img} w="600" className="rounded-2xl" />} */}
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            consequuntur temporibus saepe obcaecati et aliquid voluptas aut
            eaque ab est quae architecto, fugit illum sunt, cum tempora quam
            odio deserunt?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            consequuntur temporibus saepe obcaecati et aliquid voluptas aut
            eaque ab est quae architecto, fugit illum sunt, cum tempora quam
            odio deserunt?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            consequuntur temporibus saepe obcaecati et aliquid voluptas aut
            eaque ab est quae architecto, fugit illum sunt, cum tempora quam
            odio deserunt?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            consequuntur temporibus saepe obcaecati et aliquid voluptas aut
            eaque ab est quae architecto, fugit illum sunt, cum tempora quam
            odio deserunt?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            consequuntur temporibus saepe obcaecati et aliquid voluptas aut
            eaque ab est quae architecto, fugit illum sunt, cum tempora quam
            odio deserunt?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            consequuntur temporibus saepe obcaecati et aliquid voluptas aut
            eaque ab est quae architecto, fugit illum sunt, cum tempora quam
            odio deserunt?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            consequuntur temporibus saepe obcaecati et aliquid voluptas aut
            eaque ab est quae architecto, fugit illum sunt, cum tempora quam
            odio deserunt?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            consequuntur temporibus saepe obcaecati et aliquid voluptas aut
            eaque ab est quae architecto, fugit illum sunt, cum tempora quam
            odio deserunt?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            consequuntur temporibus saepe obcaecati et aliquid voluptas aut
            eaque ab est quae architecto, fugit illum sunt, cum tempora quam
            odio deserunt?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            consequuntur temporibus saepe obcaecati et aliquid voluptas aut
            eaque ab est quae architecto, fugit illum sunt, cum tempora quam
            odio deserunt?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            consequuntur temporibus saepe obcaecati et aliquid voluptas aut
            eaque ab est quae architecto, fugit illum sunt, cum tempora quam
            odio deserunt?
          </p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <div className="flex flex-col gap-4">
            <h1 className="mb-4 text-sm font-medium">Author</h1>
            <div className="flex items-center gap-8">
              <IkImage
                src="userImg.jpeg"
                className="w-12 h-12 rounded-full object-cover"
                w="48"
                h="48"
              />
              <Link className="text-blue-800">John Doe</Link>{" "}
            </div>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="flex gap-2">
              <Link>
                <IkImage src="facebook.svg" />
              </Link>
              <Link>
                <IkImage src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-3 text-sm">
            <Link className="underline" to="/">
              All
            </Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
            <Link className="underline" to="/">
              development
            </Link>
            <Link className="underline" to="/">
              Databases
            </Link>
            <Link className="underline" to="/">
              Search Engines
            </Link>
            <Link className="underline" to="/">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      {/* Comments */}
      <Comments/>
    </div>
  );
};

export default SinglePostPage;
