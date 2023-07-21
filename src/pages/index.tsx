
import Image from 'next/image'
import { json } from 'stream/consumers';

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Post } from '@/types';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

type Props = {
  posts: Post[];
}

export async function getStaticProps() {
  // docker network inspect <ネットワーク名> 
  // で表示されるIPAM > config > Gateway で書き換える
  // const res = await fetch(`http://${process.env.ngate}:${process.env.hostp}/api/v1/posts`); // どっちでもいけるOK？
  const res = await fetch(`http://172.25.0.1:${process.env.hostp}/api/v1/posts`); // どっちでもいけるOK？
  // 10.0.0.1 と 172.25.0.1 は、異なるプライベートIPアドレスの範囲に属しています。
  // どちらを使用するかは、ネットワーク構成によって異なります。
  // 一般的に、10.0.0.1 は、クラスAのプライベートIPアドレス範囲であり、
  // 小規模なネットワークに適しています。一方、172.16.0.0 から 172.31.255.255 までの範囲は、
  // クラスBのプライベートIPアドレス範囲であり、中規模のネットワークに適しています。
  // どちらを使用するかは、ネットワーク構成によって異なります。
  // ただし、どちらを使用しても、同じネットワーク内にある他のデバイスと通信することができます。
  // 選択するIPアドレスは、ネットワーク管理者に相談することをお勧めします。

  const posts = await res.json();
  
  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24, //ISRが24時間毎に発火 
  };
}

export default function Home({ posts }: Props) {
  const router = useRouter();

  const handleDelete = async (postId: string) => {
    try{
      await axios.delete(`http://localhost:${process.env.hostp}/api/v1/posts/${postId}`)
      router.reload();
    }catch(err){
      alert("削除に失敗しました")
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.homeContainer}>
        <h2>Rails & Next.js Blog</h2>
        <Link href="/create-post" className={styles.createButton}>
          Create new Post
        </Link>
        <div>
          {posts.map((post: Post) => (
            <div key={post.id} className={styles.postCard}>
              <Link href={`posts/${post.id}`} className={styles.postCardBox}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.content}</p>
              <Link href={`/edit-post/${post.id}`}>
                <button className={styles.editButton}>Edit</button>
              </Link>
              <button
               className={styles.deleteButton}
               onClick={() => handleDelete(post.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      
      
      {/* <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
