"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PostResponse } from "@/app/types";
import {
  createComment,
  getPostById,
  likePost,
  retweetPost,
} from "@/app/lib/utils";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [post, setPost] = useState<PostResponse | null>(null);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    getPostById(id).then((res) => {
      setPost(res);
    });
  }, [id]);

  const like = async () => {
    await likePost(id);
    const updated = await getPostById(id);
    setPost(updated);
  };

  const retweet = async () => {
    await retweetPost(id);
    const updated = await getPostById(id);
    setPost(updated);
  };

  const sendComment = async () => {
    if (!comment.trim()) return;

    await createComment(id, comment);
    setComment("");

    const updated = await getPostById(id);
    setPost(updated);
  };

  return (
    <main className="PageContainer">
      <button className="BackButton" onClick={() => router.back()}>
        ← Volver
      </button>

      {post && (
        <>
          <section className="PostCard detail">
            <div className="Avatar">
              {post.autor.username[0].toUpperCase()}
            </div>

            <div className="PostContent">
              <div className="PostHeader">
                <strong>{post.autor.username}</strong>
                <span>{new Date(post.createdAt).toLocaleString()}</span>
              </div>

              <p className="BigText">{post.contenido}</p>

              <div className="PostActions">
                <button
                  onClick={like}
                  className={
                    post.likes.length > 0 ? "LikeButton active" : "LikeButton"
                  }
                >
                  ♥ {post.likes.length}
                </button>

                <button
                  onClick={retweet}
                  className={
                    post.retweets.length > 0
                      ? "RetweetButton active"
                      : "RetweetButton"
                  }
                >
                  ↻ {post.retweets.length}
                </button>
              </div>
            </div>
          </section>

          <section className="Comments">
            <h3>○ Comentarios ({post.comentarios.length})</h3>

            <div className="CommentForm">
              <div className="Avatar small">?</div>

              <input
                placeholder="Escribe un comentario..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button onClick={sendComment}>Enviar</button>
            </div>

            {post.comentarios.length === 0 && (
              <p className="EmptyText">
                No hay comentarios aun. Se el primero!
              </p>
            )}

            {post.comentarios.map((comentario) => (
              <div key={comentario._id} className="Comment">
                <strong>{comentario.autor.username}</strong>
                <span>{new Date(comentario.fecha).toLocaleString()}</span>
                <p>{comentario.contenido}</p>
              </div>
            ))}
          </section>
        </>
      )}
    </main>
  );
}