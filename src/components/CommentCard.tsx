import { Button } from "@headlessui/react";
import { Heart } from "lucide-react";

export default function CommentCard() {
  return (
    <div className="flex gap-4">
      <div className="flex-none rounded-full overflow-hidden h-8 aspect-square">
        <img
          src="/default.jpg"
          alt="default"
          className="aspect-square object-cover"
        />
      </div>
      <div className="text-sm">
        <span className="font-semibold mr-2">afrika.world</span>
        Lumumba VEA, whose real name is Michel Kuka Mboladinga, is a Congolese
        football superfan...
      </div>
      <div className="py-4">
        <Button className="">
          <Heart className="size-4" />
        </Button>
      </div>
    </div>
  );
}
