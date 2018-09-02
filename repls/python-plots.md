# Interactive Python Plots

Though the console ony supports text output, we provide with the ability to
create plots and charts using matplotlib (and other libraries).  Here, we
will show you the basics of generating plots using Python3 and matplotlib.

In order to use matplotlib, the first thing you have to do is
[install the package](repls/packages).  Matplotlib is often shortened
using `as` but it does not have to be.

```python
import matplotlib as mpl
```

Note that this should be in your code as early as possible, and must be
before you import the `pylab` or `pyplot` packages:

```python
import matplotlib as mpl
import matplotlib.pyplot as plt
```

Then, write the code to generate the plot as normal.  In this example,
we're just going to do something simple:

```python
plt.plot([1,2,3])
```

At this point, you would normally use `plt.show()` to open a new window with
the plot, but since that isn't supported, we will have to use `plt.savefig()`
instead.  This function saves the plot to an image file.

```python
plt.savefig('plot.png')
```

Running the code should then generate a new pane with your generated plot!
The plot has also been saved to an image `plot.png`.  This will work regardless
of whether you are in [Project Mode](repls/files) or not.  The preview pane
will appear whenever the file has been changed.

You can see the above example here.  Make sure you drag out the file tree from
the left hand side in order to see the newly generated file.  To see the generated
preview pane, view the repl directly
[here](https://repl.it/@timmy_i_chen/docs-matplotlib-example).

<iframe height="400px" width="100%" src="https://repl.it/@timmy_i_chen/docs-matplotlib-example?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>