"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PostResponse, UserResponse } from "../types";
import { followUser, getProfileById } from "../lib/utils";
import { PostComponent } from "./PostComponent";

export const ProfileComponent = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [user, setUser] = useState<UserResponse | null>(null);
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [siguiendo, setSiguiendo] = useState<boolean>(false);

  useEffect(() => {
    getProfileById(id)
      .then((res) => {
        setUser(res.user);
        setPosts(res.posts);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleFollow = async () => {
  try {
    const res = await followUser(id);
    setSiguiendo(res.siguiendo);

    const profile = await getProfileById(id);
    setUser(profile.user);
    setPosts(profile.posts);
  } catch {
    alert("Error al seguir/dejar de seguir");
  }
};

  return (
    <main className="PageContainer">
      <button className="BackButton" onClick={() => router.back()}>
        ← Volver
      </button>

      {loading && <p>Cargando...</p>}

      {!loading && user && (
        <>
          <section className="ProfileCard">
            <div className="ProfileCover"></div>

            <div className="ProfileInfo">
              <div className="ProfileAvatar">
                {user.username.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2>{user.username}</h2>
                <p>{user.email}</p>
              </div>

              <button onClick={handleFollow}>
                {siguiendo ? "Dejar de seguir" : "⚭ Seguir"}
              </button>
            </div>

            <div className="ProfileStats">
              <span>⚭ {(user as any).seguidores?.length || 0} seguidores</span>
              <span>⚭ {(user as any).seguidos?.length || 0} seguidos</span>
            </div>
          </section>

          <h3 className="SectionTitle">Publicaciones ({posts.length})</h3>

          {posts.map((post) => (
            <PostComponent key={post._id} post={post} />
          ))}
        </>
      )}
    </main>
  );
};