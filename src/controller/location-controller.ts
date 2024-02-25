import { Location } from "../model/location";
import { successResponse, errorResponse, ErrorCode } from "../utils";

export class LocationController {
  constructor() {}

  // Get Location By ID
  async getLocationById(_locationId: number) {
    try {
      const location = await Location.findByPk(_locationId);

      if (!location)
        return errorResponse(ErrorCode.NotFound, "Location Not Found!");

      return successResponse(location);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  // Get Location List (by Category if provided)
  async getLocations(
    _page: number,
    _page_size: number,
    _category: string | undefined
  ) {
    const offset = (_page - 1) * _page_size;
    try {
      const locations = await Location.findAll({
        ...(_page_size > 0 && _page > 0
          ? { offset: offset, limit: _page_size, order: [["createdAt", "ASC"]] }
          : {}),
        ...(_category ? { where: { category: _category } } : {}),
      });

      return successResponse(locations);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  // Create Location
  async newLocation(_locationInfo: any) {
    try {
      const location = new Location(_locationInfo);
      const newLocation = await location.save();

      return successResponse(newLocation);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  // Update Location By ID
  async updateLocation(_locationId: number, _locationInfo: any) {
    try {
      const location = await Location.findByPk(_locationId);
      if (!location)
        return errorResponse(ErrorCode.NotFound, "Location Not Found!");

      location.set(_locationInfo);
      const newLocation = await location.save();

      return successResponse(newLocation);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  // Update Location By Category
  async updateLocationByCategory(_category: string, _locationInfo: any) {
    try {
      if (!_category) {
        return errorResponse(ErrorCode.BadRequest, "Category is not valid!");
      }

      const result = await Location.update(_locationInfo, {
        where: { category: _category },
      });

      return successResponse({ updateCount: result[0] });
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  // Delete Location By ID
  async deleteLocation(_locationId: number) {
    try {
      const location = await Location.findByPk(_locationId);
      if (!location)
        return errorResponse(ErrorCode.NotFound, "Location Not Found!");

      await location.destroy();
      return successResponse({});
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }
}
