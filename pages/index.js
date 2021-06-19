import Head from 'next/head'
import {sanityClient, urlFor} from '../lib/sanity'
import Link from 'next/link'
import {recipe} from '../studio/schemas/recipe';

const recipesQuery = `*[_type == "recipe"]{
	_id,
	name,
	slug,
	mainImage
}`;

export default function Home({recipes}) {
	console.log(recipes)
	return (
		<div >
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ul className="recipe-list">
				{recipes?.length > 0 && recipes.map((recipe) => (
					<li key={recipe.name} className="recipe-card">
						<Link href={`/recipes/${recipe.slug.current}`}>
							<a>
								<img src={urlFor(recipe.mainImage).url()} alt='some img' />
								<span>{recipe.name}</span>
							</a>
						</Link>
					</li>
				))}
			</ul>

		</div>
	)
}

export async function getStaticProps() {
	const recipes = await sanityClient.fetch(recipesQuery)
	return {props: {recipes}}
}