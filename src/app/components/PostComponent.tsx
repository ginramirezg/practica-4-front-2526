"use client";

import Link from "next/link";
import { useState } from "react";
import { PostResponse } from "../types";
import { getPostById, likePost, retweetPost } from "../lib/utils";

export const PostComponent = ({ post }: { post: PostResponse }) => {
  const [localPost, setLocalPost] = useState<PostResponse>(post);

  const like = async (e: React.MouseEvent) => {
    e.preventDefault();
    await likePost(localPost._id);
    const updated = await getPostById(localPost._id);
    setLocalPost(updated);
  };

  const retweet = async (e: React.MouseEvent) => {
    e.preventDefault();
    await retweetPost(localPost._id);
    const updated = await getPostById(localPost._id);
    setLocalPost(updated);
  };

  return (
    <div className="PostCard">
      <Link href={`/profile/${localPost.autor._id}`}>
        <div className="Avatar">
          {localPost.autor.username.charAt(0).toUpperCase()}
        </div>
      </Link>

      <div className="PostContent">
        <div className="PostHeader">
          <Link href={`/profile/${localPost.autor._id}`}>
            <strong>{localPost.autor.username}</strong>
          </Link>

          <span>{new Date(localPost.createdAt).toLocaleString()}</span>
        </div>

        <Link href={`/post/${localPost._id}`}>
          <p>{localPost.contenido}</p>
        </Link>

        <div className="PostActions">
          <button
            onClick={like}
            className={
              localPost.likes.length > 0 ? "LikeButton active" : "LikeButton"
            }
          >
            ♥ {localPost.likes.length}
          </button>

          <button
            onClick={retweet}
            className={
              localPost.retweets.length > 0
                ? "RetweetButton active"
                : "RetweetButton"
            }
          >
            ↻ {localPost.retweets.length}
          </button>

          <Link href={`/post/${localPost._id}`}>
            ○ {localPost.comentarios.length}
          </Link>
        </div>
      </div>
    </div>
  );
};