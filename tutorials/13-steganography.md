# Hiding messages in images: steganography with Python and Repl.it
 
In this tutorial, we'll build a steganography tool in Python. Steganography is the practice of hiding information within other data. Unlike encryption, where the goal is to secure *the contents* of communication between two parties, steganography aims to obscure the fact that the parties are communicating at all.

Our tool will enable the user to hide secret text within a normal-looking `.png` image file. The receiver of the image will use the same tool to reveal the hidden message.

We'll use Python to build the tool. The most popular Python image processing libraries are [Pillow](https://pypi.org/project/Pillow/) and [OpenCV](https://pypi.org/project/opencv-python/), but these are heavy libraries with many dependencies. We'll avoid these and instead use the lightweight [PyPNG](https://pypi.org/project/pypng/) library which is written in pure Python, and therefore easier to run on various platforms.
 
## A quick background on steganography
 
Let's imagine three people: Alice, Bob and Eve. Alice wants to send a private message to Bob, while Eve wants to intercept this message. While modern-day encryption can help Alice and Bob ensure that Eve doesn't know the *contents* of their message, Eve can possibly still deduce interesting information just from knowing that Alice and Bob are communicating at all, and how frequently they communicate.

To obscure the communication channel completely, Alice and Bob can exploit the fact that hundreds of millions of photos are uploaded and shared across the internet daily. Instead of communicating direclty, Alice can leave her message hidden in an image at a pre-agreed location and Bob can access this message. From Eve's perspective, there is now no direct communication between the two.
 
A single image is made up of millions of pixels. While many formats exist, a pixel is most simply represented by a group of three numbers between 0 and 255, one number each for the red, blue, and green values of that pixel. Using this Red-Green-Blue scheme we can represent any colour in the [RGB color model](https://en.wikipedia.org/wiki/RGB_color_model).
 
Digital text, like images, is also represented internally by numbers, so the differences between a text file and an image file are not as large as you might assume. Any digital data can be represented as a [binary string](https://thehelloworldprogram.com/computer-science/what-is-binary/): a bunch of 1s and 0s, and we can make tiny modifications to an image to encode a binary string within it. As an example, consider the following:

```python
image = [(255, 0, 0), (0, 255, 0), (0, 0, 255)]
```
This is a representation of an image with three pixels: one red, one green, and one blue. If we encode this as an image and open it in an image viewer, we'll see the three pixel image, but if we read this data with Python, it is simply a list of tuples, each containing three integers.

We could also look at each value making up each pixel and calculate whether it is *odd* or *even*. We could encode odd numbers as `1` and even values as `0`. This would give us the binary string "100 010 001" (as the 255 values are odd and the 0s are even).

If we made a small modification to the image as follows:

```python
image = [(254, 1, 1), (1, 255, 1), (1, 0, 254)]
```

The image would look almost identical in any image viewer (we have just added or subtracted a minuscule amount of color from some values), but the binary string -- using our odd/even method -- would look completely different: "011 111 100". 

Using this technique but extending it over an entire image (millions of pixels), we can hide a large amount of text data in any image.

### Creating the project on Repl.it

If you were serious about keeping your messages as secret as possible, you'd want to do all of these steps on an offline computer that you fully control. As a learning exercise though, we'll set the project up on [repl.it](https://repl.it). Navigate to their site and sign up for an account if you don't have one.

Create a new project, choosing "Python" as the language, and give your project a name.

![Creating a new Repl](images/04-create-repl.png)

The first piece we need to build is a function to encode any text message as a binary string.
 
### Encoding a text message as a binary string
 
Open the `main.py` file and add the following code
 
```python
import base64
 
def encode_message_as_bytestring(message):
    b64 = message.encode("utf8")
    bytes_ = base64.encodebytes(b64)
    bytestring = "".join(["{:08b}".format(x) for x in bytes_])
    bytestring += ENDOFMESSAGE
    return bytestring
```


 
The `ENDOFMESSAGE` variable refers to a random string of binary data that we add to the end of our encoded message to identify where the message ends. The receiving end will use the exact same binary string to identify the end of the message and decode it.
 
The `encode_message_as_bytestring()` function does the following:
- Encodes the message in `utf-8` and then to `base64`. We add the `base64` conversion so that this application will also be able to encode data types other than text. ie. Hiding another image or video file within the image.
- We then create our `bytestring` by looping through the base64 characters, converting each to its binary representation and joining them together into a string of bits.
- Now we have the complete message as a binary string. Before returning the `bytesrting` we append `ENDOFMESSAGE` to the `bytestring` to complete the encoded message that we will hide in the image.
 
### Getting pixels from an image
 
Our next step will be to upload an image and extract the pixel data so that we can hide our encoded message within those pixels.
 
You can upload a `png` image of your choice by clicking on the three dot menu, in the top right corner of the files pane to the left, and selecting "upload file" or by simply dragging and dropping it within the files pane.
 
![Image showing file upload](images/05-upload-file.png)
 
Now that we have an image, let's create a function to extract the pixel data from the image. The PyPNG module is a lightweight `png` module that allows us to read and write a `png` file.
 
Add the following code under the `encode_message_as_bytestring()` function in the `main.py` file.
 
```python
def get_pixels_from_image(fname):
    img = png.Reader(fname).read()
    pixels = img[2]
    return pixels
```
The above function uses the PyPNG module's *Reader Class Object* to get the `png` data.
 
The `read()` method returns a 4‑tuple consisting of:
 
- width: Width of PNG image in pixels;
- height: Height of PNG image in pixels;
- rows: A sequence or iterator for the row data;
- info: An info dictionary containing much of the image metadata.
 
We are interested in the third, "rows", which is a lazy iterator containing all the pixels of the image, row by row. So we take the "row" data from the 4-tuple at index position 2 and add it to a variable called `pixels`.
 
A [generator function](https://realpython.com/introduction-to-python-generators/) returns a lazy iterator which is an object that we can loop over like a list. However, unlike lists, lazy iterators do not store their contents in memory.
 
### Encoding the image with the message
 
Now that we have the message and pixels of the image ready we can combine them to form our secret encoded image.
 
Add the following function to the `main.py` file, below the `get_pixels_from_image()` function.
 
```python
def encode_pixels_with_message(pixels, bytestring):
    '''modifies pixels to encode the contents from bytestring'''
 
    enc_pixels = []
    string_i = 0
    for row in pixels:
        enc_row = []
        for i, char in enumerate(row):
            if string_i >= len(bytestring):
                pixel = row[i]
            else:
                if row[i] % 2 != int(bytestring[string_i]):
                    if row[i] == 0:
                        pixel = 1
                    else:
                        pixel = row[i] - 1
                else:
                    pixel = row[i]
            enc_row.append(pixel)
            string_i += 1
 
        enc_pixels.append(enc_row)
    return enc_pixels
```
The above function loops through each row of pixels then loops through each character in those rows. It then checks if the pixel is an odd or even number. We accomplish this by dividing the pixel value by 2, if the remainder is 0 then it is an even number, if it is 1 then it's an odd number. It then compares the result (1 or 0) to the bit in the same index position of the `bytestring` list, if they match then it keeps the pixel value the same, if they don't then it subtracts one from the pixel value which in turn changes the value from odd to even or vice versa, changing the bit to match that of the `bytestring` list. We then append the updated pixels from each row to the `enc_row` list and in the end we append `enc_row` to `enc_pixels` forming the complete secret encoded image.
 
### Writing pixels to an image
 
We now have a complete image with the encoded message but it is still just a list of pixels. Let's add a function that will compile our pixels back into a `png` image.
 
Add the following function to the bottom of the `main.py` file.
 
```python
def write_pixels_to_image(pixels, fname):
    png.from_array(pixels, 'RGB').save(fname)
```
The above function simply takes the array `pixels` and uses the `png` module to compile and save a new image.
 
## Decoding
 
We have now seen how to encode the message into an image, next we'll build the decoding part so that the receiving end can extract the secret message.
 
### Decoding the message from an image
 
As with the encoding, we need to extract the pixel data from the image again in order to decode the message. We will use the same `get_pixels_from_image()` function already defined above. The flow of the program will become more clear once we get to the `main()` function later.
 
After extracting the pixels from the image we can decode the pixels in order to extract our secret message.
 
Add the following code to the bottom of the `main.py` file.
 
```python
def decode_pixels(pixels):
    bytestring = []
    for row in pixels:
        for c in row:
            bytestring.append(str(c % 2))
    bytestring = ''.join(bytestring)
    message = decode_message_from_bytestring(bytestring)
    return message
```
The above function is similar to the `encode_pixels_with_message()` function except this time we reverse it. We loop through the pixel values, divide them by 2 and append the remainder (1 or 0) to the `bytestring` list. This gives us our message in binary format. We then call the `decode_message_from_bytestring()` function passing the `bytestring` list to it.
 
Let's add the `decode_message_from_bytestring()` function to the end of the `main.py` file.
 
```python
def decode_message_from_bytestring(bytestring):
    bytestring = bytestring.split(ENDOFMESSAGE)[0]
    message = int(bytestring, 2).to_bytes(len(bytestring) // 8, byteorder='big')
    message = base64.decodebytes(message).decode("utf8")
    return message
```
Again the above function is similar to the `encode_message_as_bytestring()` function only in reverse. Specifically it finds the end of the message by splitting the bytestring at the `ENDOFMESSAGE` string and only keeps the message at index position 0. It then converts the string of bits into 8bit bytes and decodes the message back to text.
 
That's it for our encoding and decoding functions, next we'll put everything together in our `main()` function.
 
## Main function
 
Ideally, we would want to create a front-end for our app where users can easily upload images and hide secret messages within them but for this tutorial, we'll make it a command-line program.
 
Let's create a prompt for our users to interact with our encode/decode application.
 
Add the following to the top of your `main.py` file, right below the imports.
 
```python
PROMPT = """
Welcome to basic steganography. Please choose:
 
1. To encode a message into an image
2. To decode an image into a message
q. to exit
"""
```
Now let's write the `main()` function that puts it all together. Add the following to the end of the `main.py` file.
 
```python
def main():
    print(PROMPT)
    user_inp = ""
    while user_inp not in ("1", "2", "q"):
        user_inp = input("Your choice: ")
 
    
    if user_inp == "1":
        in_image = input("Please enter filename of existing PNG image: ")
        in_message = input("Please enter the message to encode: ")
 
        print("-ENCODING-")
        pixels = get_pixels_from_image(in_image)
        bytestring = encode_message_as_bytestring(in_message)
        epixels = encode_pixels_with_message(pixels, bytestring)
        write_pixels_to_image(epixels, in_image + "-enc.png")
 
    elif user_inp == "2":
        in_image = input("Please enter the filename of an existing PNG image: ")
        print("-DECODING-")
        pixels = get_pixels_from_image(in_image)
        print(decode_pixels(pixels))
 
 
if __name__ == "__main__":
    main()
```
The `main()` function above creates a prompt flow for the user to interact with the program. Depending on the input from the user, the program will call the relative functions in order to either encode or decode a message. We also included a `q` for the user to close the program.
 
## Adding more layers
 
Using the methods explained above, Alice can send messages to Bob disguised as innocent pictures. But the system remains imperfect. Depending on their situation, Eve may still grow suspicious if she is expecting Alice to try to communicate with Bob, and sees a stream of images passing between them. And considering that Eve may be anyone from a casual eavesdropper, with nothing better to do, to an entire three-letter government agency, with practically unlimited resources and technology, Alice and Bob may want to add a final layer of security.
 
One way to achieve this is counter-intuitive. Instead of Alice sending the image through some supposedly private means of communication, such as e-mail, (which, although private, is not completely secure) Alice can leave the image in a public place for Bob to ‘find’. Alice could upload the modified image to any number of public image sharing services, such as Instagram, or even more creatively, she could use a website such as 9gag.com where hundreds of ‘funny’ images are uploaded every day for the amusement of thousands of viewers. As long as Bob has some inkling of where to look for the image, he can then retrieve it, without alerting Eve to the fact that he and Alice are even communicating. Yet another option is to hide the message in an advertisement image, and pay for a third-party site to show it to their users. With the number of images to be found around the world wide web, Eve’s goal of finding the correct image, and still managing to decode the message it contains, becomes close to impossible.
 
## Challenges
 
Of course, the more layers of security that Alice and Bob add to their communication, the higher the need becomes for prior contact in order to correctly receive and interpret each other’s messages. But this prior contact is still easier to achieve than for traditional encryption in which each needs to share a long private secret which is different for each message. And should Alice and Bob have had the opportunity to communicate privately in the past, and had the foresight to share the necessary keys, then traditional encryption can be combined with steganography for an even more layered approach to covert communication. That is, Alice can encrypt the message traditionally, and then hide the result of the encryption in the image, making extraction and code-breaking analysis more difficult for Eve.
 
Another challenge, especially if the method of storing the images in publicly accessible places is used, is that images are almost always compressed. Many compression schemes use so-called ‘lossy’ compression, in which less important pixels in an image are identified and either discarded or modified.
 
A popular example of lossy compression is found in the ubiquitous JPEG format. Once an image has been compressed using one of these methods, it is impossible to reverse the process and retrieve the original image again, even though the result is indistinguishable to the human eye at normal zoom levels. And because there are many different compression methods, and public image sites do not usually specify which they are using, the subtleties introduced to an image by Alice or Bob may well be lost. Therefore Alice and Bob would need to either identify a suitable sharing platform where uncompressed images may be shared, or to examine the compression methods used and attempt to work around them. Nonetheless, steganography remains a more than theoretical means for private communication.
 
A few years ago, police in Berlin confiscated a password-protected memory card containing hidden files from a suspect who was undergoing questioning. After these files were decoded, they seemed to be pornographic videos, but after further investigation it turned out over a hundred documents relating to al Qaeda plots were encoded into the videos, using steganography. It took German investigators weeks of effort to discover and retrieve these documents, and it requires no stretch of the imagination to realise that many similar cases may have gone completely undetected. Cases like this necessarily prompt calls for more information about steganography, with the result that receiving funding to spend a few years ‘analysing’ pornography, strictly for academic purposes, is not unheard of.
 
## Closing note
 
Now you can build an application that you can use for secret text communication. This application can be expanded to encode many different data types like hiding an image within an image or you could add encryption to your message and hide the encrypted message in your image for an extra layer of security.
 
If you have followed along you'll have your own repl to expand, if not you can fork [our repl](https://repl.it/@ritza/python-steganography) and work from there or test it out below.
 
<iframe height="400px" width="100%" src="https://repl.it/@ritza/python-steganography?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
