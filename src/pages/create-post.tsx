import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from "../styles/Home.module.css";
import axios from 'axios';
import { useRouter } from 'next/router'; // 投稿後のリダイレクト機能

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter(); // 投稿後のリダイレクト機能

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(title, content); // debug

        // APIを叩く（fetch関数の代わりにaxiosライブラリを使ってみる）
        // https://circleci.com/ja/blog/making-http-requests-with-axios/
        // https://qiita.com/ksh-fthr/items/2daaaf3a15c4c11956e9
        // https://goat-inc.co.jp/blog/1663/
        // <yarn add axios>
        try {
            await axios.post(`${process.env.external_ep}/api/v1/posts`,{      
                title: title,
                content: content,
            });
            
            router.push("/"); // 投稿後のリダイレクト機能
        }catch(err){
            alert("投稿に失敗しました")
        }

    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ブログ新規投稿</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>タイトル</label>
                <input 
                    type="text" 
                    className={styles.input} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
                <label className={styles.label}>本文</label>
                <textarea 
                    className={styles.textarea} 
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                />
                <button type='submit' className={styles.button}>投稿</button>
            </form>
        </div>
    );
};

export default CreatePost