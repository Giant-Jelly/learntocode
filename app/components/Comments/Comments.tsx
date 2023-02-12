'use client'

import Giscus from '@giscus/react';

export default function Comments() {
    return (
      <Giscus
        id="comments"
        repo="Giant-Jelly/learntocode"
        repoId="R_kgDOI9AVRA"
        category="Comments"
        categoryId="DIC_kwDOI9AVRM4CUKhP"
        mapping="pathname"
        strict='1'
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang="en"
        loading='lazy'
      />
    );
  }