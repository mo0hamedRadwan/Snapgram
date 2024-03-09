import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import Loader from './Loader';

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const { data: currentUser } = useGetCurrentUser();

  const likesList = post?.likes.map((user: Models.Document) => user.$id);
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  //console.log(currentUser)
  //console.log(savedPostRecord)

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPost();

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const checkIsLiked = () => !likes.includes(currentUser?.$id);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const isLiked = newLikes.includes(userId);

    if (isLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || '', likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isSaved) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      setIsSaved(true);
      savePost({ postId: post?.$id || '', userId });
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            '/assets/icons/' + (checkIsLiked() ? 'like.svg' : 'liked.svg')
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        /> 
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2 mr-5">
      { (isSaved && isDeletingSaved) ? <Loader/> :
        <img
          src={
            '/assets/icons/' + (isSaved ? 'saved.svg' : 'save.svg')
          }
          alt="save"
          width={20}
          height={20}
          onClick={handleSavePost}
          className="cursor-pointer"
        />
      }
      </div>
    </div>
  );
};

export default PostStats;
