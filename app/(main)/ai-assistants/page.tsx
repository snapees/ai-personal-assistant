"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import AiAssistantsList from "@/services/AiAssistantsList";
import { useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";

export type ASSISTANT = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
};

function AIAssistants() {
  const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT[]>([]);
  const insertAssistants = useMutation(
    api.userAiAssistants.InsertSelectedAssistants
  );
  const { user } = useContext(AuthContext);
  // console.log("user-----------", user);
  const [loading, setLoading] = useState(false);

  const onSelect = (assistant: ASSISTANT) => {
    const item = selectedAssistant.find(
      (item: ASSISTANT) => item.id === assistant.id
    );
    if (item) {
      setSelectedAssistant(
        selectedAssistant.filter((item: ASSISTANT) => item.id !== assistant.id)
      );
      return;
    }
    setSelectedAssistant((prev) => [...prev, assistant]);
  };

  const isAssistantSelected = (assistant: ASSISTANT) => {
    const item = selectedAssistant.find(
      (item: ASSISTANT) => item.id === assistant.id
    );
    return item ? true : false;
  };

  const onClickContinue = async () => {
    setLoading(true);
    const result = await insertAssistants({
      record: selectedAssistant,
      uid: user?._id,
    });
    setLoading(false);
    console.log(result);
  };

  return (
    <div className="px-10 mt-20 md:px-28 lg:px-36 xl:px-48">
      <div className="flex justify-between items-center">
        <div>
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold">
              Welcome to the World of AI Assistants 🤖
            </h2>
          </BlurFade>

          <BlurFade delay={0.25 * 2} inView>
            <p className="text-xl mt-2">
              Choose your AI Campanion to Simplify Your Task 🚀
            </p>
          </BlurFade>
        </div>
        {/* <RainbowButton>Continue</RainbowButton> */}
        <Button
          className="cursor-pointer"
          disabled={selectedAssistant.length === 0 || loading}
          onClick={onClickContinue}
        >
          {loading && <Loader2Icon className="animate-spin" />}
          Continue
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {AiAssistantsList.map((assistant, index) => (
          <BlurFade key={assistant.image} delay={0.25 + index * 0.05} inView>
            <div
              className="hover:border p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer relative"
              key={index}
              onClick={() => onSelect(assistant)}
            >
              <Checkbox
                className="absolute m-2 border-black"
                checked={isAssistantSelected(assistant)}
              />

              <Image
                src={assistant.image}
                alt={assistant.title}
                width={600}
                height={600}
                className="rounded-xl w-full h-[200px] object-cover"
              />
              <h2 className="text-center font-bold text-lg">
                {assistant.name}
              </h2>
              <h2 className="text-center text-gray-600 dark:text-gray-300">
                {assistant.title}
              </h2>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default AIAssistants;
