import PostCard from '../PostCard/PostCard'
import style from './Main.module.css'
import { posts } from '../../posts.js'
import Tags from '../tags/Tags.jsx'
import { useState } from 'react'
import Button from '../Button/Button.jsx'

const initialFormData = {
  title: '',
  image: undefined,
  content: '',
  tags: [],
  published: false
}


export default function Main() {

  const [formData, setFormData] = useState(initialFormData)

  const [publishedPosts, setPublishedPosts ] = useState(posts.filter((post) => post.published === true ))
  const tags = []

  posts.forEach(post => {

    const postTags = post.tags
    // console.log(postTags)

    postTags.forEach((tag) => {
      if(!tags.includes(tag)) {
        tags.push(tag)
      }
      // !tags.includes(tag) && tags.push(tag)
    })

  })

  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  const [image,setImage] = useState('')


  function addPost (e) {

    e.preventDefault()

    const newTitle = title.trim()
    if (newTitle === '') return

    const post = {
    id: Date.now(),
		title,
		image: undefined,
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.',
		tags: [],
		published: true,
    }

    setPublishedPosts([...publishedPosts,post])
    setTitle('')

  }

  function deletePost (id) {
    setPublishedPosts(publishedPosts.filter(post => post.id !== id))
  }

  return (
    <main>
      <section className={style.section}>
          <div className="container">
            <h1 className={style.section_title}>Il mio blog</h1>
          </div>
          <div className="container">
          
          {/* QUI INIZIA IL FORM  */}
          
          <form onSubmit={addPost} action="" className={style.inline_form}>
            {/* <input value={title} onChange={(e) => setTitle(e.target.value) } type="text" placeholder='Titolo del post' /> */}
            <div>
              <label htmlFor="title">Titolo del post</label>
              <input value={title} name='title' onChange={(e) => setTitle(e.target.value) } type="text" id="name" placeholder="Titolo del post" />
            </div>
            <div>
              <label htmlFor="content">Contenuto del post</label>
              <input value={content} name='content' onChange={(e) => setContent(e.target.value) }type="text"id="content" placeholder="Contenuto del post"/>
            </div>
            <div>
              <label htmlFor="image">Immagine del post</label>
              <input value={image} name='image' onChange={(e) => setImage(e.target.value) } type="text" id="image" placeholder="Percorso immagine del post" />
            </div>
            <div>
              <label htmlFor="category">Categoia del post</label>
              <select name="categories" id="category">
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="js">JS</option>
                <option value="php">PHP</option>
              </select>
            </div>
            <input className={style.submit_btn} type="submit" value="Aggiungi il post!" />
          </form>
          </div>
          
          {/* QUI FINISCE IL FORM  */}
          
          <div className="container">
            <Tags className={style.tags_centered} tags={tags} />
          </div>
          <div className="container">
            <div className="row">
              {publishedPosts.map((el) => (
                <div key={el.id} className="col-4">
                  <PostCard onDelete={() => deletePost(el.id)} post={el} />
                </div>
              ))}
            </div>
        </div>
      </section>
    </main>
  );
}