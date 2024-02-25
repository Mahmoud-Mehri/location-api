import { Router } from "express";
import { LocationController } from "../../../controller/location-controller";
import {
  ErrorCode,
  checkObjectKeys,
  errorResponse,
  removeErrorCode,
} from "../../../utils";
import { LOCATION_REQUIRED } from "../../../model/location";

export const locationRouter = Router();
const locationController = new LocationController();

// Get Location List (by Category if provided)
locationRouter.get("/", async (req, res) => {
  const category = req.query.category?.toString();
  const page = req.query.page ? parseInt(req.query.page.toString()) || 0 : 0;
  const page_size = req.query.page_size
    ? parseInt(req.query.page_size.toString()) || 0
    : 0;

  locationController.getLocations(page, page_size, category).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

// Get Location by ID
locationRouter.get("/:id", async (req, res) => {
  const locationId = parseInt(req.params.id);

  locationController.getLocationById(locationId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

// Add New Location
locationRouter.post("/", async (req, res) => {
  const requiredKeys = checkObjectKeys(req.body, LOCATION_REQUIRED);
  if (requiredKeys.length > 0) {
    const result = errorResponse(
      ErrorCode.BadRequest,
      `These fields are required: [${requiredKeys.join(",")}]`
    );
    return res.status(result.errorCode).json(removeErrorCode(result));
  }

  const locationInfo = {
    name: req.body.name,
    category: req.body.category,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    description: req.body.description ? req.body.description : "",
    rating: req.body.rating ? req.body.rating : null,
    reviewCount: req.body.reviewCount ? req.body.reviewCount : null,
  };

  locationController.newLocation(locationInfo).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

// Update Location by ID
locationRouter.patch("/:id", async (req, res) => {
  const locationId = parseInt(req.params.id);

  locationController.updateLocation(locationId, req.body).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

// Update Locations by Category
locationRouter.patch("/", async (req, res) => {
  let category: string;
  if (req.query.category) {
    category = req.query.category.toString();
  } else {
    return res
      .status(ErrorCode.BadRequest)
      .json(
        removeErrorCode(
          errorResponse(ErrorCode.BadRequest, "Invalid parameters")
        )
      );
  }

  locationController
    .updateLocationByCategory(category, req.body)
    .then((result) => {
      res.status(result.errorCode).json(removeErrorCode(result));
    });
});

// Delete Location by ID
locationRouter.delete("/:id", async (req, res) => {
  let locationId = 0;
  try {
    locationId = parseInt(req.params.id);
  } catch (err) {}

  locationController.deleteLocation(locationId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});
