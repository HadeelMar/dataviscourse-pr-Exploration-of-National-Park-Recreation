##  Exploration of National Park Recreation
Data Visualization project

## Team Members

Hadeel Maryoosh u0921391@utah.edu ... Username on Github: Mila1988


Tony Niven u0490795@utah.edu         ... Username on Github: VampyreSix

## Running Instructions

Access our visualization at http://mila1988.github.io/dataviscourse-pr-Exploration-of-National-Park-Recreation/ or download this repository and run python -m SimpleHTTPServer 2255 and access this from http://localhost:2255/.

Please use only  Chrome for ideal viewing.

## Storyboard
      
 The National Parks of the United States provide a unique natural experience to all who visit them but the average individualmay not know much about these parks or when they came to be.
 
Using data provided by the United States National Park service we created a visualization which aims not only to provide a small historical context for these parks and how they have grown, but also an avenue for curious nature explorers to find National Parks they may enjoy visiting.
    Please explore our visualization and some of its features by clicking on "Launch Visualization" button above.
  
    There are several views in the presentation each for a different purpose. Our slider is the main tool to select the year for the charts in this project. Our map provides a geographical context for the user to understand where a given park may reside and through one of several selection modes, the user can make some judgements between parks already. Nodes in the map view are sized according to the currently selected metric, visible above the map. Users can select from several methods; Annual visitation to a park which is the default, the estimated number of 'Facebook Likes' that a park has received and the average 'Google Review' score. Additionally, users can select from the land area of the park as a metric of sizing the nodes.
   
     Next to the map is an information box for the decade in which the chronoological slider at the top currently resides. This information gives some background information as to new developments among the parks for the decade such as new parks being opened or other trends. On the other side of the map, the visitation comparison displays all of the currently selected parks and compares their annual visitation for the selected year.
     As the year changes, the bars will be sized according to their attendance for the given year. The yearly visitation data is available all the way back to 1930 and continues until 2014. You can track the growth of the national parks by scrolling the slider starting from 1930 and up, you will notice how the parks nodes on map, and the bars change. For example, we can notice "GreatSmoky Mountains" park that was established in 1930's(as shown in the info bar) and its growth through the decades, eventually it becomes one of the most popular ones.
     By default, all parks are selected for this comparison but the user can unselect parks by clicking on the corresponding node in the map. A convenient legend helps the user identify which parks are and are not selected. The user can also reset to a single default park by clicking the reset parks button, which is nice if the user wants to select and focuses on Utah parks only for example. After the year 1979, the parks service began dividing annual visitation data by month, and as a result for all years after 1978, one can select a month for the given year as well. The corresponding affect on the bars is immediately noticeable. When the chronological slider is moved out of this range, annual data is automatically re-selected.
     Clicking on one of the bars in this view will highlight the selected node on the map and the bar in question will also change color. We call this selection the 'Activities park' because it drives another view.
     
     Available for years after 1979, the year the parks service began collecting this information, the Activities View and Activities Comparison allow users to explore the popularity of certain activities in a given set of parks.
     The activities bubble chart gives an indication of the popularity of an activity for the selected time period in the 'Activities Park', noted above by its unique color in the map and unique bar color.
     When a certain activity is selected, the Activities Comparison view will activate as well for the same time frame. This view allows users to see how the selected activities park compares to other parks in their overall selection and is driven by the activity data for the given timeframe.
     Both of these views operate in a yearly or monthly context.
     Lastly, a small portion of text, driven by the activity selection gives an indication of how the National Parks service decided to classify certain activities to give the user a context as to what they are looking at.
     
      Whether one is exploring only the historical growth by using the map and chronological slider, or performing more in depth, personalized comparisons of select parks to view the relative popularity of activities, our users will find an intuitive, interactive and fun tool to help them learn more about the National Parks and perhaps they too will gain the desire to visit these wonderful national treasures.

