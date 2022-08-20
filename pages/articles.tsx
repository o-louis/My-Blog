import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getSortedPostsData } from '../lib/posts';

import Date from '../components/Date';
import Layout from "../components/Layout";

interface Props {
  allPostsData: Array<{
    id: string;
    date: string;
    title: string;
    tags: string[];
  }>;
}

const COLORTAGS = {
  css: 'bg-blue-700 text-white',
  js: 'bg-yellow-300 text-black',
  vue: 'bg-emerald-400 text-white',
  html: 'bg-orange-600 text-white',
  react: 'bg-slate-700 text-cyan-400',
  python: 'bg-sky-700 text-white',
  svelte: 'bg-neutral-700 text-white',
  next: 'bg-black text-white',
  nuxt: 'bg-emerald-900 text-white'
}

export default function Articles({ allPostsData }: Props) {
  return (
    <Layout>
      <section className="py-10">
        {allPostsData.map(({ id, date, title, tags }) => (
          <article key={id} className="flex flex-col py-4 px-4 border-b border-gray-800 hover:text-tertiary">
            <Link  href={`/articles/${id}`}>
              <a className="flex justify-between align-center">
                <span className="text-xl">{title}</span>
                <Date dateString={date} className="text-md text-gray-500" />
              </a>
            </Link>
            <ul className="mt-4 self-end flex gap-x-2">
              {tags.map(tag => 
                <li key={tag+id} className={`flex items-center rounded-sm uppercase 
                  w-auto px-2 py-1 max-w-[15rem] font-semibold text-xs ${COLORTAGS[tag]}`}>{tag}</li>
              )}
            </ul>
          </article>
        ))}
      </section>
    </Layout>
  ) 
}

export const getStaticProps: GetStaticProps = () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}