# Sample Visualization Scripts

This document provides sample scripts for generating visualizations using both **Python** and **R**. Use these scripts as references or starting points for your own visualization projects. Each script accepts an output file name as an argument and saves the resulting visualization to that file.

---

## Python Scripts

### 1. Static Visualization (Matplotlib)

This Python script generates a static plot of a sine wave with added noise using Matplotlib. It also computes a moving average for a smoother trend line and saves the plot as a high-resolution PNG.

```python
import sys
import numpy as np
import matplotlib.pyplot as plt

# Use the default Matplotlib style (or customize your own settings)
plt.rcParams.update({
    'font.size': 12,
    'axes.titlesize': 16,
    'axes.titleweight': 'bold',
    'axes.labelsize': 14,
    'lines.linewidth': 2,
    'lines.markersize': 6,
    'grid.linestyle': '--',
    'grid.linewidth': 0.6,
    'legend.fontsize': 12
})

# Ensure an output file is provided; default to 'static_plot.png' if none is given.
if len(sys.argv) < 2:
    output_file = "static_plot.png"
else:
    output_file = sys.argv[1]

# Generate synthetic data: a sine wave with added random noise
x = np.linspace(0, 10, 200)
y = np.sin(x) + 0.15 * np.random.randn(len(x))

# Compute a simple moving average for a trend line
window_size = 10
y_smooth = np.convolve(y, np.ones(window_size) / window_size, mode='same')

# Create a figure with a defined size
plt.figure(figsize=(10, 6))

# Plot the raw noisy data with markers and a line
plt.plot(x, y, label='Noisy Data', color='#1f77b4', linestyle='-', marker='o', alpha=0.7)
# Plot the moving average (trend) line
plt.plot(x, y_smooth, label='Trend (Moving Average)', color='#d62728', linewidth=3)

# Add title and axis labels
plt.title("Enhanced Static Plot: Sine Wave with Noise")
plt.xlabel("X-axis (units)")
plt.ylabel("Y-axis (units)")

# Display grid and legend
plt.grid(True)
plt.legend()

# Adjust layout for better spacing
plt.tight_layout()

# Save the figure as a high-resolution PNG
plt.savefig(output_file, dpi=150)
plt.close()

print(f"Enhanced static plot saved to: {output_file}")
```

### 2. 2. Interactive Visualization (Plotly)

This script creates an interactive scatter plot using Plotly with the built-in Iris dataset and saves the visualization as an HTML file.

```python
import sys
import plotly.express as px

# Usage: python interactive_plot.py output.html
output_file = sys.argv[1]  # e.g. "plot.html"

# For demonstration, use a built-in Plotly dataset: Iris
df = px.data.iris()

# Create an interactive scatter plot
fig = px.scatter(
    df,
    x='sepal_width',
    y='sepal_length',
    color='species',
    title='Interactive Scatter Plot (Plotly)'
)

# Save as an interactive HTML file
fig.write_html(output_file)

print(f"Interactive Plotly chart saved to {output_file}")
```

### 3. 3D Visualization (Plotly)

This Python script generates a 3D scatter plot with random data using Plotly and saves the interactive visualization as an HTML file.

```python
import sys
import plotly.express as px
import numpy as np

# Usage: python plot_3d.py output.html
output_file = sys.argv[1]  # e.g. "plot_3d.html"

# Generate sample 3D data: random points
num_points = 50
x = np.random.rand(num_points) * 10
y = np.random.rand(num_points) * 10
z = np.random.rand(num_points) * 10

fig = px.scatter_3d(
    x=x,
    y=y,
    z=z,
    color=z,
    title="3D Scatter Plot (Plotly)"
)

# Save the interactive 3D plot as an HTML file
fig.write_html(output_file)

print(f"3D interactive chart saved to {output_file}")
```

## Python Scripts

### 1. Static Visualization (ggplot2)

This R script creates an enhanced static plot using ggplot2 with a light theme. It plots a scatter plot of sepal measurements from the built-in iris dataset with a linear trend line overlay, and saves the result as a high-resolution PNG file.

```r
#!/usr/bin/env Rscript
# Enhanced Static Plot (Light Theme) using ggplot2

# Capture command-line arguments for the output file name
args <- commandArgs(trailingOnly = TRUE)
output_file <- ifelse(length(args) > 0, args[1], "enhanced_static_plot_light.png")

# Set a default CRAN mirror if needed
options(repos = c(CRAN = "https://cloud.r-project.org"))

# Load ggplot2 (install if necessary)
if (!require(ggplot2)) {
  install.packages("ggplot2", dependencies = TRUE)
  library(ggplot2)
}

# Use the built-in iris dataset
data("iris")

# Create a ggplot: Scatter plot with a linear fit overlay
p <- ggplot(iris, aes(x = Sepal.Length, y = Sepal.Width, color = Species)) +
  geom_point(size = 3, alpha = 0.8) +                                        # Scatter plot
  geom_smooth(method = "lm", se = FALSE, linetype = "dashed", color = "black") +  # Linear trend line
  labs(
    title = "Enhanced Static Plot: Iris Sepal Measurements",
    subtitle = "Relationship between Sepal Length and Sepal Width",
    x = "Sepal Length (cm)",
    y = "Sepal Width (cm)",
    caption = "Data: iris dataset"
  ) +
  theme_light(base_size = 14) +                                              # Light theme
  theme(
    plot.title = element_text(face = "bold", hjust = 0.5),
    plot.subtitle = element_text(face = "italic", hjust = 0.5),
    legend.position = "right",
    legend.title = element_text(face = "bold")
  )

# Save the plot as a high-resolution PNG file
ggsave(filename = output_file, plot = p, width = 8, height = 6, dpi = 150)

cat("Enhanced static light plot saved to:", output_file, "\n")
```

### 2. Interactive Visualization (Plotly)

This R script creates an interactive scatter plot using Plotly with the mtcars dataset. It saves the visualization as an HTML file. The row names of mtcars are used as car names in the tooltips.

```r
#!/usr/bin/env Rscript
# This script creates an enhanced interactive scatter plot using the built-in mtcars dataset.

# Capture the output file from command-line arguments
args <- commandArgs(trailingOnly = TRUE)
output_file <- ifelse(length(args) > 0, args[1], "interactive_cars.html")

# Set a default CRAN mirror if needed
options(repos = c(CRAN = "https://cloud.r-project.org"))

# Load the required libraries
if (!require(plotly)) { install.packages("plotly", dependencies = TRUE); library(plotly) }
if (!require(htmlwidgets)) { install.packages("htmlwidgets", dependencies = TRUE); library(htmlwidgets) }

# Prepare the data: use the row names as car names
data <- mtcars
data$car <- rownames(mtcars)

# Create an interactive scatter plot:
p <- plot_ly(
  data = data,
  x = ~hp,
  y = ~mpg,
  type = 'scatter',
  mode = 'markers',
  color = ~as.factor(cyl),
  size = ~wt,
  sizes = c(20, 100),
  marker = list(opacity = 0.8, line = list(width = 1, color = 'black')),
  text = ~paste("Car:", car,
                "<br>Cylinders:", cyl,
                "<br>Weight:", wt)
) %>% layout(
  title = "Interactive Car Performance Visualization",
  xaxis = list(title = "Horsepower (hp)"),
  yaxis = list(title = "Miles per Gallon (mpg)"),
  legend = list(title = list(text = "Cylinders"))
)

# Save the interactive plot to an HTML file
saveWidget(as_widget(p), output_file, selfcontained = TRUE)

cat("Interactive visualization saved to:", output_file, "\n")
```

### 3. Interactive 3D Surface Plot (Plotly)

This script generates an interactive 3D surface plot using Plotly. The surface is based on the function z = sin(r)/r (with r = sqrt(x² + y²)) and includes contour lines. It saves the plot as a self-contained HTML file.

```r
#!/usr/bin/env Rscript
# interactive_3d_surface.R
#
# This script generates an interactive 3D surface plot using Plotly.
# The surface is defined by the function: z = sin(r)/r, where r = sqrt(x^2 + y^2)
# It includes contour lines and uses a Viridis colorscale.
# The output is saved as a self-contained HTML file.
#
# Usage: Rscript interactive_3d_surface.R output_filename.html

# Capture the output file argument; default if not provided
args <- commandArgs(trailingOnly = TRUE)
output_file <- ifelse(length(args) > 0, args[1], "interactive_3d_surface.html")

# Set a default CRAN mirror if needed
options(repos = c(CRAN = "https://cloud.r-project.org"))

# Load required libraries
if (!require(plotly)) { install.packages("plotly", dependencies = TRUE); library(plotly) }
if (!require(htmlwidgets)) { install.packages("htmlwidgets", dependencies = TRUE); library(htmlwidgets) }

# Create a grid for X and Y values
x <- seq(-10, 10, length.out = 100)
y <- seq(-10, 10, length.out = 100)

# Compute Z values using the function z = sin(r)/r, handling r = 0 with a small epsilon
epsilon <- 1e-6
z <- outer(x, y, function(x, y) {
  r <- sqrt(x^2 + y^2) + epsilon
  sin(r) / r
})

# Create an interactive 3D surface plot with contours
p <- plot_ly(
  x = ~x,
  y = ~y,
  z = ~z,
  type = "surface",
  colorscale = "Viridis",
  contours = list(
    z = list(
      show = TRUE,
      usecolormap = TRUE,
      highlightcolor = "#ff0000",
      project = list(z = TRUE)
    )
  )
) %>% layout(
  title = "Enhanced Interactive 3D Surface Plot",
  scene = list(
    xaxis = list(title = "X-axis"),
    yaxis = list(title = "Y-axis"),
    zaxis = list(title = "Z-axis")
  )
)

# Save the interactive plot as a self-contained HTML file
saveWidget(as_widget(p), file = output_file, selfcontained = TRUE)

cat("Interactive 3D surface plot saved to:", output_file, "\n")
```
