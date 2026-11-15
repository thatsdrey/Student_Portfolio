C:\Users\LENOVO\Downloads\cos106-portfolio\cos106-portfolio\images\right_angled_triangle.py# Check if a triangle is right-angled

first = float(input("First angle: "))
second = float(input("Second angle: "))

if first > 0 and second > 0 and first + second < 180:
    third = 180 - first - second
    print("The last angle is", third)

    if first == 90 or second == 90 or third == 90:
        print("It is a right triangle.")
    else:
        print("It is not a right triangle.")
else:
    print("Those angles cannot make a triangle.")