import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function PostsLoader() {
  return (
    <div className="flex mx-auto w-full flex-col gap-4 lg:gap-8 my-0 lg:my-8">
      <Card className="w-full rounded-none">
        <CardHeader className="px-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent className="px-4">
          <div className="w-full pt-2 px-0">
            <Skeleton className="h-32 lg:h-16 w-full" />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full rounded-none">
        <CardHeader className="px-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent className="px-4">
          <div className="w-full pt-2 px-0">
            <Skeleton className="h-32 lg:h-16 w-full" />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full rounded-none">
        <CardHeader className="px-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent className="px-4">
          <div className="w-full pt-2 px-0">
            <Skeleton className="h-32 lg:h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
