// ignore_for_file: file_names

class ClinicAdd {
  String name;
  String description;
  String contactEmail;
  String contactNumber;
  String city;
  String street;
  String postalCode;
  String buildingNumber;

  ClinicAdd({
    this.name = '',
    this.description = '',
    this.contactEmail = '',
    this.contactNumber = '',
    this.city = '',
    this.street = '',
    this.postalCode = '',
    this.buildingNumber = '',
  });

  factory ClinicAdd.fromJson(Map<String, dynamic> json) {
    return ClinicAdd(
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      contactEmail: json['contactEmail'] ?? '',
      contactNumber: json['contactNumber'] ?? '',
      city: json['city'] ?? '',
      street: json['street'] ?? '',
      postalCode: json['postalCode'] ?? '',
      buildingNumber: json['buildingNumber'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'description': description,
      'contactEmail': contactEmail,
      'contactNumber': contactNumber,
      'city': city,
      'street': street,
      'postalCode': postalCode,
      'buildingNumber': buildingNumber,
    };
  }
}
