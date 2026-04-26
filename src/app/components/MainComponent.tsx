"use client";

import { useEffect, useState } from "react";
import { PostResponse } from "../types";
import { createPost, getPosts } from "../lib/utils";
import { PostComponent } from "./PostComponent";
import { useRouter } from "next/navigation";

export const MainComponent = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [content, setContent] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  const loadPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getPosts(page);

      if (page === 1) {
        setPosts(data.posts);
      } else {
        setPosts((prev) => [...prev, ...data.posts]);
      }

      setTotalPages(data.totalPaginas);
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push("/login");
      } else {
        setError("Error al cargar los posts");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  const publish = async () => {
    if (!content.trim()) return;

    try {
      await createPost(content);
      setContent("");

      const data = await getPosts(1);
      setPosts(data.posts);
      setPage(1);
      setTotalPages(data.totalPaginas);
    } catch {
      setError("Error al publicar el post");
    }
  };

  return (
    <main className="PageContainer">
      <section className="PostCreator">
        <div className="Avatar">?</div>

        <div className="CreatorContent">
          <textarea
            placeholder="¿Qué hay de nuevo en Nebrija?"
            maxLength={280}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="CreatorFooter">
            <span>{content.length}/280</span>

            <button
              onClick={publish}
              className={content.trim() ? "PublishButton active" : "PublishButton"}
            >
              ↪ Publicar
            </button>
          </div>
        </div>
      </section>

      <h3 className="SectionTitle">⌘ Últimas publicaciones</h3>

      {loading && <p>Cargando...</p>}
      {error && <p className="Error">{error}</p>}

      {posts.map((post) => (
        <PostComponent key={post._id} post={post} />
      ))}

      {page < totalPages && (
        <button className="LoadMore" onClick={() => setPage(page + 1)}>
          Cargar más
        </button>
      )}
    </main>
  );
};