"use client";

export function ChapterTools({ chinese, english }: { chinese: string; english: string }) {
  function speak(text: string, lang: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = .82;
    window.speechSynthesis.speak(utterance);
  }

  return <div className="chapter-tools"><button onClick={() => speak(chinese, "zh-CN")}>▶ Listen in Chinese</button><button onClick={() => speak(english, "en-US")}>▶ Listen in English</button></div>;
}
