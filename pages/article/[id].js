import NavbarComponent from '@/components/Navbar'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import cookie from 'cookie'
import Footer from '@/components/Footer'

export async function getServerSideProps(context){
  
  // console.log(context.query)
  let cookies = cookie.parse(context.req.headers.cookie || '')
  let cookiesvalue = cookies.articleid

    context.res.setHeader('Set-Cookie', cookie.serialize('articleid', context.query.id, {
      httpOnly: true,
      maxAge: 60 * 60
    }))

    cookies = cookie.parse(context.req.headers.cookie || '')
    cookiesvalue = cookies.articleid
    console.log(cookiesvalue)
  // fetch data 
  const res = await fetch(`http://localhost:8080/article/get-detail-article/${cookiesvalue}`)
  const repo = await res.json()

  console.log(repo.article)

  return {
    props: {article: repo.article}
  }
}

function id(article) {
  const [currLogin, setCurrLogin] = useState('')
  console.log(article)

  // validate cookies 
    // if(cookies().get("detarticleid") == undefined) cookies().set("detarticleid", param.id)
  // if(cookie.get("detarticleid")) console.log(cookie.get("detarticleid"))

  // get current user 
  const getCurrentUserLogin = () => {
    axios.get(`http://localhost:8080/customer/get-current-login?userid=${sessionStorage.getItem("userid")}`)
    .then((res)=>{
      setCurrLogin(res.data.data[0]["Userfullname"])
    })
  }

  useEffect(()=>{
    getCurrentUserLogin()
  }, [])

  return (
    <div className='min-h-screen'>
      <div className="relative">
        <img src="/route_image.png" className="w-full" />
        <div className="absolute top-0 w-full">
          <NavbarComponent log={currLogin} />
          <div className="w-1/2 my-[30px] ml-[30px] text-[40px] text-white font-bold">
            <h1>Welcome to Our Article Page !</h1>
          </div>
          <div className="ml-[30px] text-white text-[25px]">
            <p>Enjoy the article !</p>
          </div>
        </div>
      </div> 
      <div className='min-h-96'>
        <div className='my-5 text-center text-[20px] font-bold'>
          <p>{article.article[0]['Articletitle']}</p>
        </div>
        <div className='my-5 mx-10'>
          <p>{article.article[0]['Articletext']}</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default id