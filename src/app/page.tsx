import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <div>
        <Button variant={"elevated"} className="text-red-500">
          Hello World
        </Button>
      </div>
      <div><Input value={'kjj'} type="text" /></div>
      <Progress value={50} className="w-[400px]" />
      <Textarea placeholder="Type here..." className="w-[400px]" />
    </div>
  );
}
