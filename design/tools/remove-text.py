# Removes the baked-in text from the approved desk mockup (design/approved/home-desktop.png)
# so it can be rendered as real HTML. Usage: python3 remove-text.py <in> <out.png> <mask.png>
import cv2, numpy as np, sys
src, out, maskout = sys.argv[1:4]
im = cv2.imread(src)                      # BGR
b, g, r = [im[:,:,i].astype(int) for i in range(3)]
lum = (0.299*r + 0.587*g + 0.114*b)
ink = ((b - r) > 6) | (lum < 125)         # navy ink: bluer than the warm desk, or dark
mask = np.zeros(im.shape[:2], np.uint8)
# (x1, y1, x2, y2) regions containing text to remove, in 1200x800 image coords
regions = [
    (52, 118, 345, 290),   # name
    (52, 300, 345, 418),   # statement lines 1-5 above the polaroid
    (52, 418, 318, 438),   # "from ideas toward real-world"
    (52, 438, 175, 468),   # "impact."
    (918, 326, 1022, 430), # Lab annotation (arrow kept)
    (728, 670, 864, 765),  # Portfolio annotation (arrow kept)
    (305, 638, 388, 672),  # About title on polaroid (arrow kept)
    (312, 668, 404, 722),  # About list
]
for x1,y1,x2,y2 in regions:
    mask[y1:y2, x1:x2] = (ink[y1:y2, x1:x2] * 255).astype(np.uint8)
mask[282:293, 56:114] = 255               # thin rule under the name
mask = cv2.dilate(mask, np.ones((3,3), np.uint8), iterations=2)
cv2.imwrite(maskout, mask)
clean = cv2.inpaint(im, mask, 6, cv2.INPAINT_TELEA)
# Soften speckle left at the edges of each patch: blend a blurred copy in,
# feathered around the mask so the join is invisible.
soft = cv2.GaussianBlur(clean, (0, 0), 3)
feather = cv2.GaussianBlur(cv2.dilate(mask, np.ones((5,5), np.uint8), iterations=2), (0, 0), 4) / 255.0
clean = (clean * (1 - feather[..., None]) + soft * feather[..., None]).astype(np.uint8)
cv2.imwrite(out, clean)
