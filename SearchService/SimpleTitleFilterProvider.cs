using ITOps.Composition;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace SearchService
{
    public class SimpleTitleFilterProvider : IProvideData
    {
        public bool Matches(RouteData routeData, HttpRequest request)
        {
            var controller = ((string)routeData.Values["controller"]).ToLowerInvariant();
            var action = ((string)routeData.Values["action"]).ToLowerInvariant();

            return controller == "data" && request.Query.ContainsKey("search");
        }

        public Task<IEnumerable<Movie>> SearchForMovies(string title)
        {
            var data = new[] {
                new Movie
                {
                    Title = "Black Panther",
                    Thumbnail = "/images/blackpanther.jpg",
                    Rating = 7.8,
                    Description = "After the death of his father, T'Challa returns home to the African nation of Wakanda to take his rightful place as king.When a powerful enemy suddenly reappears, T'Challa's mettle as king -- and as Black Panther -- gets tested when he's drawn into a conflict that puts the fate of Wakanda and the entire world at risk. Faced with treachery and danger, the young king must rally his allies and release the full power of Black Panther to defeat his foes and secure the safety of his people.",
                    Price = "R 35.00"
                }, new Movie
                {
                    Title = "Star Wars: The Last Jedi",
                    Thumbnail = "/images/thelastjedi.jpg",
                    Rating = 7.5,
                    Description = "Luke Skywalker's peaceful and solitary existence gets upended when he encounters Rey, a young woman who shows strong signs of the Force.Her desire to learn the ways of the Jedi forces Luke to make a decision that changes their lives forever. Meanwhile, Kylo Ren and General Hux lead the First Order in an all-out assault against Leia and the Resistance for supremacy of the galaxy.",
                    Price = "R 38.00"
                }, new Movie
                {
                    Title = "Inxeba",
                    Thumbnail = "/images/inxeba.jpg",
                    Rating = 8.4,
                    Description = "Xolani joins the other men of his community on a journey to the mountains to initiate a group of teenagers into manhood. His entire existence starts to unravel when a defiant initiate from the city discovers his best-kept secret, a forbidden love.",
                    Price = "R 30.00"
                }, new Movie
                {
                    Title = "Animal Farm",
                    Thumbnail = "/images/animalfarm.jpg",
                    Rating = 7.2,
                    Description = "In this animated film based on George Orwell's novel, animals on drunken Mr.Jones' (Maurice Denham) farm, led by prize hog Old Major (also Denham), gather to discuss their abuse. Old Major exhorts the animals to rebel. Boxer the horse, donkey Benjamin, pigs Snowball and Napoleon and the others agree, and when Old Major dies, they turn against Jones. But Napoleon secretly raises a group of puppies to do his bidding, and over time the efficiently run farm falters as Napoleon schemes to take over.",
                    Price = "R 25.00"
                }, new Movie
                {
                    Title = "Nun's on the run",
                    Thumbnail = "/images/nunsontherun.jpg",
                    Rating = 5.9,
                    Description = "Set up by their boss to be knocked off following a final heist, soon-to-retire crooks Brian (Eric Idle) and Charles (Robbie Coltrane) get wind of their impending demise and run off with the spoils of their crime. Fleeing their boss, the drug dealers they robbed, the police and Brian's angry girlfriend, the two take refuge in a training convent for nuns.In disguise, they convince Sister Superior (Janet Suzman) that they're nuns, a charade they are forced to maintain as their enemies arrive.",
                    Price = "R 18.00"
                }, new Movie
                {
                    Title = "Pitch Perfect 3",
                    Thumbnail = "/images/pitchperfect.jpg",
                    Rating = 6.1,
                    Description = "After the highs of winning the world championships, the Bellas find themselves split apart and discovering there aren't job prospects for making music with your mouth. But when they get the chance to reunite for an overseas USO tour, this group of awesome nerds will come together to make some music, and some questionable decisions, one last time.",
                    Price = "R 15.00"
                }
            }.AsEnumerable();

            if (!string.IsNullOrWhiteSpace(title))
            {
                data = data.Where(m => m.Title.ToLowerInvariant().Contains(title.ToLowerInvariant()));
            }

            return Task.FromResult(data);
        }

        public async Task PopulateData(dynamic viewModel, RouteData routeData, HttpRequest request)
        {
            viewModel.SearchResults = await SearchForMovies(request.Query.ContainsKey("search") ? request.Query["search"].ToString() : null);
        }
    }

    public class Movie
    {
        public string Title { get; set; }
        public string Thumbnail { get; set; }
        public double Rating { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
    }
}
