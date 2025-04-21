"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

type Comment = {
  id: string
  author: string
  authorImage: string
  authorInitials: string
  content: string
  likes: number
  timestamp: string
  isLiked: boolean
  replies?: Comment[]
}

export default function Comments() {
  const [commentText, setCommentText] = useState("")
  const [showComments, setShowComments] = useState(true)
  const [sortBy, setSortBy] = useState<"top" | "newest">("top")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Alex Johnson",
      authorImage: "/placeholder.svg?height=40&width=40",
      authorInitials: "AJ",
      content: "This is exactly what I needed! The new compiler is a game changer for my projects.",
      likes: 243,
      timestamp: "2 days ago",
      isLiked: false,
    },
    {
      id: "2",
      author: "Sarah Miller",
      authorImage: "/placeholder.svg?height=40&width=40",
      authorInitials: "SM",
      content:
        "Great explanation of the new features. I'm especially excited about the improved static site generation.",
      likes: 128,
      timestamp: "1 week ago",
      isLiked: false,
      replies: [
        {
          id: "2-1",
          author: "Vercel",
          authorImage: "/placeholder.svg?height=40&width=40",
          authorInitials: "VC",
          content:
            "Thanks Sarah! We're glad you found it helpful. Let us know if you have any questions about implementing these features.",
          likes: 56,
          timestamp: "6 days ago",
          isLiked: false,
        },
      ],
    },
    {
      id: "3",
      author: "David Chen",
      authorImage: "/placeholder.svg?height=40&width=40",
      authorInitials: "DC",
      content:
        "I've been using Next.js for years and each version keeps getting better. The performance improvements in v15 are incredible!",
      likes: 87,
      timestamp: "3 days ago",
      isLiked: false,
    },
  ])

  const handleLikeComment = (commentId: string, replyId?: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (replyId && comment.id === commentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === replyId
                ? { ...reply, isLiked: !reply.isLiked, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1 }
                : reply,
            ),
          }
        }

        if (!replyId && comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          }
        }

        return comment
      }),
    )
  }

  const handleAddComment = () => {
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: `new-${Date.now()}`,
      author: "You",
      authorImage: "/placeholder.svg?height=40&width=40",
      authorInitials: "YO",
      content: commentText,
      likes: 0,
      timestamp: "Just now",
      isLiked: false,
    }

    setComments([newComment, ...comments])
    setCommentText("")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setShowComments(!showComments)} className="font-medium">
          {comments.length} Comments
          {showComments ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
        </Button>

        <Button variant="ghost" size="sm" onClick={() => setSortBy(sortBy === "top" ? "newest" : "top")}>
          Sort by: {sortBy === "top" ? "Top comments" : "Newest first"}
        </Button>
      </div>

      {showComments && (
        <div className="space-y-6">
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="min-h-[60px] resize-none"
              />

              {commentText.trim() && (
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setCommentText("")}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddComment}>Comment</Button>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.authorImage} alt={comment.author} />
                    <AvatarFallback>{comment.authorInitials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>

                    <p className="mt-1 text-sm">{comment.content}</p>

                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <ThumbsUp className={`h-4 w-4 ${comment.isLiked ? "fill-current" : ""}`} />
                      </Button>

                      <span className="text-xs">{comment.likes}</span>

                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>

                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>

                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-10 space-y-4 border-l-2 pl-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.authorImage} alt={reply.author} />
                          <AvatarFallback>{reply.authorInitials}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{reply.author}</span>
                            <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                          </div>

                          <p className="mt-1 text-sm">{reply.content}</p>

                          <div className="mt-2 flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleLikeComment(comment.id, reply.id)}
                            >
                              <ThumbsUp className={`h-4 w-4 ${reply.isLiked ? "fill-current" : ""}`} />
                            </Button>

                            <span className="text-xs">{reply.likes}</span>

                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ThumbsDown className="h-4 w-4" />
                            </Button>

                            <Button variant="ghost" size="sm" className="h-8 text-xs">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
